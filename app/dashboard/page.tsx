// components
import FormSelectRole from "@/components/pages/dashboard/forms/new-user/form";

// nextjs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// supabase
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Container from "@/components/layout/container";

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
  if (role === "provider") {
    redirect("/dashboard/provider");
  }

  return (
    <section>
      <Container className="flex flex-col gap-4 mt-24 max-w-2xl">
        <FormSelectRole />
      </Container>
    </section>
  );
}
