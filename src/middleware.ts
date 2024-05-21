
import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        // console.log(req.nextUrl.pathname)
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token
            },
        },
    },
)

export const config = {
    matcher: ['/dashboard', '/dashboard/edit-profile', '/questions/new', '/library/new']
}