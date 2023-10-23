import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from("user").select();

  const role = data && data[0].role;

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  if (role === "student") {
    redirect("/dashboard/student");
  }

  if (role === "user") {
    redirect("/dashboard");
  }

  return <h1>test page</h1>;
}
