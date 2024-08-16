import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { LOCKED_SCREEN_PASSW } = process.env;

  if (LOCKED_SCREEN_PASSW) {
    console.log('Site locked. redirecting to home page');
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

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
