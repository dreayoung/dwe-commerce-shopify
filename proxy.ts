import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Next.js 16 now looks for a default export or a named 'proxy' function
export default async function proxy(request: NextRequest) {
  const { LOCKED_SCREEN_PASSW } = process.env;

  // In Next.js 16, environment variables are accessed the same way,
  // but the proxy runs in a more optimized Edge-like environment.
  if (LOCKED_SCREEN_PASSW) {
    // Standardizing logs for the new Next.js 16 telemetry
    console.log('Site locked: Redirecting request to root');
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// The matcher remains very similar, but Next.js 16 is stricter
// with regex patterns to improve startup performance.
export const config = {
  matcher: [
    '/collectibles/:path*',
    '/connect/:path*',
    '/product/:path*',
    '/core/:path*',
    '/api/:path*',
    '/about/:path*'
  ]
};
