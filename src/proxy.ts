import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Renamed from middleware.ts to proxy.ts as per deprecation warning
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

// Optional: config for the proxy
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};