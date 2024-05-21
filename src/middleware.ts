import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export default async function middleware(request: NextRequest) {
    
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
        headers: {
            cookie: request.headers.get('cookie') as string
        }
    })

    const session = await res.json()

    if (!session?.user) {
        if (['/login', '/signup'].includes(request.nextUrl.pathname)) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL(`/login?callbackUrl=${request.nextUrl.pathname}`, request.url))
    }
    
    if (['/login', '/signup'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/signup', '/dashboard', '/dashboard/edit-profile', '/questions/new', '/library/new']
}