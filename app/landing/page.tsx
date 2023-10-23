import Hero from "@/components/pages/landing/hero/hero";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Landing() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data } = await supabase.from("user").select();
    console.log(data);
    const role = data?.length && data.length > 0 ? data[0].role : "";

    if (role === "admin") {
      redirect("/dashboard/admin");
    }

    if (role === "user") {
      redirect("/dashboard");
    }

    if (role === "student") {
      redirect("/dashboard/student");
    }
  }

  return (
    <main>
      <Hero />
    </main>
  );
}
