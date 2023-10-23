import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"


export async function GET(request: Request) {
    // you have to call this router hanlder from client component
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.auth.getSession()
    const todos = await supabase.from("todos").select()
    console.log(cookies().getAll())

    return NextResponse.json({ data })

}