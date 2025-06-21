import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const verifiedToken = token && (await verifyAuth(token));

  // Protect all /host routes
  if (request.nextUrl.pathname.startsWith('/host') && !verifiedToken) {
    request.nextUrl.pathname = '/sign-in';
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}