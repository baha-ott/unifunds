import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'



export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const res = await request.json();
    const { email } = res;
    const { password } = res;
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const supabaseRes = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        },
    })

    return NextResponse.json(supabaseRes)
}