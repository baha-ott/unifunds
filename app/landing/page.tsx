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
    const { data: user } = await supabase.from("user").select();
    const role = user && user[0].role;

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
