import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("You need to be authenticated to access this page");
  }

  const { data } = await supabase.from("user").select();
  const role = data?.length && data.length > 0 ? data[0].role : "";

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  if (role === "student") {
    redirect("/dashboard/student");
  }

  return (
    <section className="flex justify-center mt-24">
      <Alert className="max-w-2xl text-center mx-8 space-y-4 bg-brand-primary bg-opacity-5">
        <AlertTitle>Welcome {data?.length && data[0].user_id}</AlertTitle>
        <AlertDescription>Lets start create your profile</AlertDescription>
      </Alert>
    </section>
  );
}
