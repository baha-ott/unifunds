"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
import { profileFormSchema } from "@/lib/forms-schema";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  firstname: "",
  lastname: "",
  description: "",
  nationality: "",
  university: "",
  major: "",
  avatar: "",
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    console.log("it working");

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function test() {
      const { data } = await supabase.from("user").select("*, profile(*)");

      console.log(data);
    }

    test();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile picture</FormLabel>
              <FormControl>
                <div className="relative h-36 w-36 border border-violet-300 rounded-full cursor-pointer">
                  <label
                    htmlFor="profile-picture"
                    className="cursor-pointer h-full w-full flex items-center justify-center"
                  >
                    <PlusIcon />
                  </label>
                  <Input
                    type="file"
                    {...field}
                    className="rounded-full w-40 h-40 hidden"
                    name="profile-picture"
                    id="profile-picture"
                  />
                </div>
              </FormControl>
              <FormDescription>
                We use your profile picture to identify it with your id make
                sure to user a real photo of you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>Should be the same as your id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>Should be the same as your id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Palestinian" {...field} />
              </FormControl>
              <FormDescription>
                For double citizen students enter as this format
                spanish-palestinian
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input placeholder="Al-Quds open university" {...field} />
              </FormControl>
              <FormDescription>
                You have to be studying at palestinian university
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major</FormLabel>
              <FormControl>
                <Input placeholder="Al-Quds open university" {...field} />
              </FormControl>
              <FormDescription>What are you studying</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descreption</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about your self" {...field} />
              </FormControl>
              <FormDescription>
                Tell us more about your self to know you better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save profile</Button>
      </form>
    </Form>
  );
}
