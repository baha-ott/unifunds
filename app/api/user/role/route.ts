import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function PUT(request: Request) {
    // you have to call this router hanlder from client component
    const { role, firstname, lastname, country, address } = await request.json();
    if (!role) {
        throw new Error('failed to set your profile');
    }
    const supabase = createRouteHandlerClient({ cookies });

    const { data: user, error } = await supabase.from("user").select();
    if (!user || error) {
        throw new Error("something went wrong")
    }

    const [{ user_id }] = user
    const updateUserRoleRes = await supabase
        .from("user")
        .update({ role, firstname, lastname, country, address })
        .eq("user_id", user_id)




    return NextResponse.json(updateUserRoleRes)

}