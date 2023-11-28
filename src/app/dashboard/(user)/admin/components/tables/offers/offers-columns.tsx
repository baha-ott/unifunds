"use client";

import { ColumnDef } from "@tanstack/react-table";

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

import { Checkbox } from "@/components/ui/checkbox";

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
    accessorKey: "title",
    header: "Offer",
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },

  {
    accessorKey: "status",
    header: "Offer status",
  },
];
