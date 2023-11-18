import UserMessage from "./components/userMessage/user-message";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProviderDashboard from "./components/provider-dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardStudentPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("user").select();

  if (!data || data.length === 0) {
    throw new Error("Failed getting user data try again later");
  }

  const {
    from_admin_message: adminMessage,
    is_accepted_by_admin: isUserAcceptedByAdmin,
    steps_to_do: steps,
    application_status: applicationStatus,
  } = data[0];

  if (true) {
    return <ProviderDashboard />;
    // if the user accepted by the amdin he/she could able to access their fully functional dashboard
  }

  return (
    <div className="flex justify-center items-center mt-24">
      <UserMessage
        message={adminMessage}
        steps={steps}
        applicationStatus={applicationStatus}
      />
    </div>
  );
}
