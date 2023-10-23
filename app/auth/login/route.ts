import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const res = await request.json();

    const { email } = res;
    const { password } = res;
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const supabaseRes = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    console.log(supabaseRes)


    return NextResponse.json(supabaseRes)

}