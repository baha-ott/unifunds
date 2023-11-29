/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TgtvXX3swO6
 */
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import UserRow from "../components/user-row";
import { columns } from "../components/tables/students/student-columns";
import { StudentTable } from "../components/tables/students/student-table";

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: userData } = await supabase.auth.getUser();
  const { data: users, error: errorUsers } = await supabase
    .from("user")
    .select("*, profile(*)");

  console.log(users);

  if (!userData || !users) {
    throw new Error("Failed getting your info");
  }
  const {
    //@ts-ignore
    user: { id: userid },
  } = userData;

  let { data: isAdmin, error } = await supabase.rpc("is_admin", {
    userid,
  });

  if (!isAdmin) {
    throw new Error("Only admin has access to this page");
  }

  const newUsers = users.filter((u) => u.application_status === "pinned");
  const students = users
    .filter((u) => u.role === "student")
    .map((s) => <UserRow user={...s} />);

  const providers = users
    .filter((u) => u.role === "provider")
    .map((s) => <UserRow user={...s} />);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Recent Users</h1>
      </div>
      <div className="border shadow-sm rounded-lg">
        <StudentTable columns={columns} data={newUsers} />
      </div>
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <div className="border shadow-sm rounded-lg">
        <StudentTable columns={columns} data={users} />
      </div>
    </main>
  );
}
