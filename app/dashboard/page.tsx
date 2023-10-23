import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DashboardPage({}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("You need to be authenticated to access this page");
  }

  return <h1>user dashboard</h1>;
}
