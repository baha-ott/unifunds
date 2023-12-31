"use client";
import { ModeToggle } from "@/components/shared-components/mode-toggle";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";

export default function DashboardHeader() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />

          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
