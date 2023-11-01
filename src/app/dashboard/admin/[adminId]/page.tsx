import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AdminDashboard() {
    const supabase = createServerComponentClient({ cookies })

    const { data } = await supabase.from("user").select()

    console.log(data)
    return (
        <div>
            Admin dashboard
        </div>
    );
}