// components
import FormSelectRole from "@/components/pages/dashboard/forms/new-user/form";

import Container from "@/components/layout/container";


export default async function DashboardPage() {
  return (
    <section>
      <Container className="flex flex-col gap-4 mt-24 max-w-2xl">
        <FormSelectRole />
      </Container>
    </section>
  );
}
