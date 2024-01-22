import { NextResponse } from "next/server";

export default function middleware(req: any) {
    let verify = req.cookies.get("next-auth.session-token");
    // console.log(verify)
    let url = req.nextUrl.pathname;

    // const is_protected = url.includes('/dashboard') || url.includes('/questions/new') || url.includes('/models/new') || url.includes('/dashboard/edit-profile')
    const is_protected = ['/dashboard', '/questions/new', '/models/new', '/dashboard/edit-profile'].includes(url)

    if (!verify && is_protected) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${req.nextUrl.pathname}`, req.nextUrl.origin));
    }
}
