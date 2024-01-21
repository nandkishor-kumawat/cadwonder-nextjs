// export { default } from 'next-auth/middleware'

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("next-auth.session-token")?.value || "";
  const callback = request.cookies.get("next-auth.callback-url")?.value || "";
  console.log(request.cookies)

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login?callbackUrl="+callback, request.nextUrl));
  }
}




export const config = { 
    matcher: [
        '/dashboard',
        '/library/new',
        '/questions/new',
        '/chat/:path*',
    ],
}