// Shared class names for the admin dashboard.
export const inputClass =
  'w-full rounded-xl border border-sand-200 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-slate-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20';
export const labelClass = 'mb-1 block text-sm font-bold text-ink-800';
export const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-400 disabled:opacity-60';
export const ghostButton =
  'inline-flex items-center justify-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2 text-sm font-bold text-ink-900 transition-colors hover:border-ink-900 disabled:opacity-60';
export const dangerButton =
  'inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60';
export const cardClass = 'rounded-2xl border border-sand-200 bg-white p-5';

export function errorMessage(error: unknown) {
  const code = (error as { code?: string })?.code ?? '';
  if (code === 'permission-denied') {
    return 'Permission denied. This account is not listed as an admin in the Firestore rules.';
  }
  return (error as Error)?.message ?? 'Something went wrong.';
}
