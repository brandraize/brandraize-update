// Middleware disabled due to Vercel edge runtime incompatibility
// Language routing handled via app/[lang] directory structure instead

export function middleware() {
  // This export is required but kept empty to avoid edge runtime invocation
}

export const config = {
  matcher: [], // Empty matcher - disables middleware completely
};
