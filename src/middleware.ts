export { default } from 'next-auth/middleware'



export const config = { 
    matcher: [
        '/dashboard',
        '/library/new',
        '/questions/new',
        '/chat/:path*',
    ],
}