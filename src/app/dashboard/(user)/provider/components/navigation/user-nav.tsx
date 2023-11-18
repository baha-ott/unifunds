"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BtnLogout from "./logout";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export function UserNav() {
  const [user, setUser] = useState({
    firstname: "Fetching your data",
    email: "",
    lastname: "",
    avatar_url: "",
  });

  useEffect(() => {
    async function getUsserData() {
      const supabase = createClientComponentClient();

      const { data, error } = await supabase
        .from("user")
        .select("firstname, lastname, email, profile(avatar_url)");

      if (error || data.length === 0) {
        setUser((prev) => ({
          ...prev,
          firstname: "Could not fetch your data",
        }));
        return;
      }

      const {
        firstname,
        lastname,
        email,
        profile: { avatar_url },
      }: any = data[0];

      setUser((prev) => ({
        ...prev,
        firstname,
        lastname,
        email,
        avatar_url,
      }));
    }

    getUsserData();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar_url} alt="@shadcn" />
            <AvatarFallback>
              {user.firstname.charAt(0).toUpperCase()}
              {user.lastname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/dashboard/student/settings/">Profile</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/dashboard/student/settings/">settings</Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <BtnLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
