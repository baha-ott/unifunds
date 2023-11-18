import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import BtnLogout from "../dashboard/components/navigation/logout";

export const dynamic = "force-dynamic";

async function page({}) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user } = await supabase.from("user").select("*");

  const { user_id } = user && user[0];

  console.log(user);

  let { data: isAdmin, error } = await supabase.rpc("is_admin", {
    userid: user_id,
  });

  if (!isAdmin) {
    throw new Error("Only admin has access to this page");
  }

  return (
    <div>
      <BtnLogout />
    </div>
  );
}

export default page;
