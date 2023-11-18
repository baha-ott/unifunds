import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AdminMainPage() {
  const supabse = createServerComponentClient({ cookies });

  const { data } = await supabse.from("user").select("*");

  console.log(data);
  return <h1>Admin home page</h1>;
}
