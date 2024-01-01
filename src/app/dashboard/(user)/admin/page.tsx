import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AdminMainPage() {
  const supabse = createServerComponentClient({ cookies });
  const {data: {user}, error} = await supabse.auth.getUser();

  if(error ||  !user) {
    throw new Error("You have no access to this page")
  }


  
  const { data } = await supabse.from("role").select("role").eq("user_id", user.id);
  return <h1>Admin home page</h1>;
}
