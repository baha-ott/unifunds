import { Separator } from "@/components/ui/separator";

import StudentForm from "./student-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UserInfo from "@/app/admin/user-profile/[userId]/components/user-info";
import { Alert } from "@/components/ui/alert";

export default async function SettingsProfilePage() {
  const supabase = createServerComponentClient({ cookies });

  let { data: students, error } = await supabase.from("students").select("*");

  if (!error && students && students.length > 0) {
    const { status } = students[0];
    console.log(status);

    if (status === "accepted") {
      return <UserInfo />;
    }
    if (status === "rejected") {
      return (
        <Alert>
          <h3>You application rejected contact us for more information</h3>
        </Alert>
      );
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          We will use your profile information to identify you make sure that
          the data you enter here is equal to formal documents
        </p>
      </div>
      <Separator />
      {/* <ProfileForm /> */}
      <StudentForm />
    </div>
  );
}
