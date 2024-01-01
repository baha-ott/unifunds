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
    const { error } = await supabase.auth.signOut();
    document.cookie =
      "my-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; secure";
    document.cookie =
      "my-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; secure";

    if (error) {
      throw new Error("Failed to logout");
    }
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={() => handleSignout()}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
