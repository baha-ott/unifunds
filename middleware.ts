import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { doesURLincludeValidPath } from './lib/helpers'





export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const supabase = createMiddlewareClient({ req, res })

    const { data: { session } } = await supabase.auth.getSession();

    const urlObj = new URL(req.nextUrl.pathname, req.nextUrl.origin);
    const pathname = urlObj.toString()

    if (!session && !doesURLincludeValidPath(pathname)) {
        throw new Error("You have to be authenticated first")
    }




    if (session && !pathname.includes(session.user.id)) {
        const { data } = await supabase.from("user").select();

        const { role, user_id: userId } = data?.length && data.length > 0 ? data[0] : "";


        if (role === "admin") {
            return NextResponse.redirect(new URL('http://localhost:3000/dashboard/admin', req.url))
        }

        else if (role === "student") {

            return NextResponse.redirect(new URL(`http://localhost:3000/dashboard/student/${userId}`, req.url))
        }

        else if (role === "provider") {
            return NextResponse.redirect(new URL(`/dashboard/provider/${userId}`, req.url))
        }
    }



    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}