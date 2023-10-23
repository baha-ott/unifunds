"use client";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function BtnLogout() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignout = async () => {
    const res = await supabase.auth.signOut();
    if (res.error) {
      throw new Error("Failed to logout");
    }

    router.refresh();
    router.push("/");
  };

  return (
    <DropdownMenuItem onClick={() => handleSignout()}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
