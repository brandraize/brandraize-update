import Anthropic from '@anthropic-ai/sdk';
import { agentContext, agentKnowledge } from '@/lib/agent-knowledge';
import { toLocale } from '@/lib/site';

// The website assistant: streams Claude's reply back as plain text.
const client = new Anthropic();
const MODEL = process.env.CHAT_MODEL || 'claude-opus-5-5';

const MAX_TURNS = 20;
const MAX_CHARS = 1500;

// A light per-instance limit so one visitor cannot run up the bill.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function cleanMessages(value: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (!Array.isArray(value)) return null;
  const messages = value
    .slice(-MAX_TURNS)
    .filter(
      (m): m is { role: 'user' | 'assistant'; content: string } =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim() !== '',
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  // The conversation sent to the API must start and end with the visitor.
  while (messages.length && messages[0].role !== 'user') messages.shift();
  return messages.length && messages[messages.length - 1].role === 'user' ? messages : null;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('The assistant is not configured.', { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (limited(ip)) return new Response('Too many messages. Please try again later.', { status: 429 });

  const body = await request.json().catch(() => null);
  const messages = cleanMessages(body?.messages);
  if (!messages) return new Response('Invalid conversation.', { status: 400 });

  const locale = toLocale(String(body?.locale ?? ''));
  const page = typeof body?.page === 'string' ? body.page.slice(0, 200) : '';

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    // Short conversational answers do not need deep reasoning.
    output_config: { effort: 'low' },
    system: [
      { type: 'text', text: agentKnowledge, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: agentContext(locale, page) },
    ],
    messages,
  });

  const encoder = new TextEncoder();
  const responseBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          console.error('[chat] rate limited');
        } else if (error instanceof Anthropic.APIError) {
          console.error(`[chat] API error ${error.status}:`, error.message);
        } else {
          console.error('[chat]', error);
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(responseBody, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
