"use client";
// zod
import * as z from "zod";
// hooks
import { useRouter } from "next/navigation";
// components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { useState } from "react";
import BtnFormSubmit from "@/components/shared-components/BtnFormSubmit";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const FormSchema = z.object({
  role: z.string(),
});

export default function FormInputs() {
  const [formStatus, setFormStatus] = useState<"" | "loading">("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: "",
    },
  });
  const supabase = createClientComponentClient();
  const router = useRouter();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormStatus("loading");
    const sendUserRole = async () => {
      const { data: updateRole, error } = await supabase
        .from("role")
        .insert({ role: data.role });

      if (error) {
        setFormStatus("");
        throw new Error(
          "something went wrong while setting up your profile contact us or try again later"
        );
      }



      setFormStatus("");
      router.refresh();
      router.push(`/dashboard/${data.role}`)
    };

    sendUserRole();
  }

  


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 "
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set up your profile as</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Student / Provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="provider">Scholarship Provider</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-danger">
                You will not be able to change this option later
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <BtnFormSubmit
          title="Next"
          loadingTitle="Preparing your profile"
          state={formStatus}
        />
      </form>
    </Form>
  );
}
