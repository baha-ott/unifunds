import { ModeToggle } from "@/components/shared-components/mode-toggle";
import AdminNav from "./admin-nav";

import { UserNav } from "@/app/dashboard/components/navigation/user-nav";

export default function Adminheader() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <AdminNav />

          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />

            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
