"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { profileFormSchema } from "@/lib/forms-schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import Loading from "@/components/shared-components/loading";
import BtnPrimary from "@/components/shared-components/btn-primary";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  firstname: "",
  lastname: "",
  description: "",
  nationality: "",
  university: "",
  major: "",
  gpa: 0,
  birthyear: new Date(),
};

export function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [
    {
      firstname,
      lastname,
      nationality,
      university,
      description,
      major,
      userId,
      gpa,
      birthyear,
    },
    setFormData,
  ] = useState({
    firstname: "",
    lastname: "",
    nationality: "",
    university: "",
    major: "",
    description: "",
    avatarUrl: "",
    userId: "",
    gpa: "",
    birthyear: new Date(),
  });

  //  to work with supabase
  const supabase = createClientComponentClient();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
   
    const { description, major, nationality, university } = data;

    const { data: updateData } = await supabase
      .from("students")
      .insert({ description, major, nationality, university, user_id: userId, gpa, birthyear, });

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    async function getUserFromData() {
      const { data, error } = await supabase
        .from("user")
        .select("*, students(*)");
      // getting user data from user table and profile table
      // there is a relation between user and profile

      if (data && data.length > 0) {
        const { students, ...user } = data[0];
        console.log(students);

        setFormData((prev) => ({
          ...prev,
          firstname: user.firstname,
          lastname: user.lastname,
          description: students[0].description,
          major: students[0].major,
          nationality: students[0].nationality,
          university: students[0].university,
          avatarUrl: students[0].avatar_url,
          gpa: students[0].gpa,
          userId: user.user_id,
          birthyear: students[0].birthyear,
        }));

        form.setValue("firstname", user.firstname);
        form.setValue("lastname", user.lastname);
        form.setValue("description", user.description);
        form.setValue("major", user.major);
        form.setValue("nationality", user.nationality);
        form.setValue("university", user.university);
        form.setValue("gpa", user.gpa);
        form.setValue("birthyear", user.birthyear);

        return;
      }

      if (error) {
        setError(error.message);
        return;
      }

      setError(null);
      setLoading(false);

      return;
    }

    getUserFromData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>firstname</FormLabel>
              <FormControl>
                <Input placeholder={firstname} {...field} />
              </FormControl>
              <FormDescription>Should be the same as your id card</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>lastname</FormLabel>
              <FormControl>
                <Input placeholder={lastname} {...field} />
              </FormControl>
              <FormDescription>Should be the same as your id card</FormDescription>
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
                <Input
                  placeholder={nationality ? nationality : "Palestinian"}
                  {...field}
                />
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
          name="gpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GPA</FormLabel>
              <FormControl>
                <Input
                  placeholder={gpa ? gpa : "60"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your gpa should be at least 60 to be accepted 
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
                <Input
                  placeholder={
                    university ? university : "Al-Quds open university"
                  }
                  {...field}
                />
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
                <Input
                  placeholder={major ? major : "Computer Science"}
                  {...field}
                />
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
                <Textarea
                  placeholder={
                    description ? description : "Tell us about your self  "
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell us more about your self to know you better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthyear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthyear</FormLabel>
              <FormControl>
               <Input type="date" {...field}/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <BtnPrimary type="submit">Save Profile</BtnPrimary>
      </form>
    </Form>
  );
}
