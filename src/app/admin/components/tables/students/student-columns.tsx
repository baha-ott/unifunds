"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Student = {
  user_id: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  status: string;
};

async function handleResetForm(user_id: string) {
  const supabase = createClientComponentClient();

  if (!user_id) {
    toast({
      title: "sorry failed getting user id try again",
    });

    return;
  }

  const { data, error } = await supabase
    .from("profile")
    .update({ description: "" })
    .eq("user_id", user_id);

  const { data: user } = await supabase.auth.getUser();
  console.log(user);

  if (error) {
    toast({ title: error.message });
  }
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "fullname",
    header: "fullname",
  },
  {
    accessorKey: "lastname",
    header: "lastname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "application_status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.user_id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View User detailt</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleResetForm(user.user_id)}>
              Rest user form
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
