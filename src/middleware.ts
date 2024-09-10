import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
        headers: {
            cookie: request.headers.get('cookie') as string
        }
    })

    const session = await res.json();

    if (!session?.user) {
        if (['/login', '/signup'].includes(pathname)) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/signup',
        '/dashboard/:path*',
        '/questions/new',
        '/library/new'
    ]
}