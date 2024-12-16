import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.href;
  const res = NextResponse.next();

  res.cookies.set('currentUrl', url);

  return res;
}
