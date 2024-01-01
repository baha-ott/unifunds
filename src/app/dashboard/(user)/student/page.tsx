import UserMessage from "./components/userMessage/user-message";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import StudentDashboard from "./components/student-dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardStudentPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("students").select();

  if (!data || data.length === 0) {
    const { status } = (data && data[0]) || "pinned";

    if (status === "accepted") {
      return <StudentDashboard />;
      // if the user accepted by the amdin he/she could able to access their fully functional dashboard
    }

    
    return (
      <div className="flex justify-center items-center mt-24">
        <UserMessage applicationStatus={status} />
      </div>
    );
  }
}
