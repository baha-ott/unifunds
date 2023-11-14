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
import { PlusIcon } from "lucide-react";
import { profileFormSchema } from "@/lib/forms-schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
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
  avatar: "",
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
      avatarUrl,
      userId,
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
      .from("profile")
      .update({ description, major, nationality, university })
      .eq("user_id", userId);

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
        .select("*, profile(*)");
      // getting user data from user table and profile table
      // there is a relation between user and profile

      if (data && data.length > 0) {
        const { profile, ...user } = data[0];

        setFormData((prev) => ({
          ...prev,
          firstname: user.firstname,
          lastname: user.lastname,
          description: profile.description,
          major: profile.major,
          nationality: profile.nationality,
          university: profile.university,
          avatarUrl: profile.avatar_url,
          userId: user.user_id,
        }));

        form.setValue("firstname", user.firstname);
        form.setValue("lastname", user.lastname);
        form.setValue("description", user.description);
        form.setValue("major", user.major);
        form.setValue("nationality", user.nationality);
        form.setValue("university", user.university);

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

  async function handleAddProfilePicture(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;
    const { data: userData } = await supabase.from("user").select("user_id");

    if (files && files.length > 0) {
      if (userData && userData.length > 0) {
        const { user_id: userId } = userData[0];
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`${userId}-avatar`, files[0]);
        if (error) return;
        const { data: profilePhotoData } = supabase.storage
          .from("avatars")
          .getPublicUrl(`${userId}-avatar`);

        const { publicUrl } = profilePhotoData;

        const { data: dataUpdateProfilePhoto, error: errorUpdateProfilePhoto } =
          await supabase
            .from("profile")
            .update({ avatar_url: publicUrl })
            .eq("user_id", userId);
      }
    }
    setError(null);
  }

  return loading ? (
    <Loading />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile picture</FormLabel>
              <FormControl onChange={handleAddProfilePicture}>
                <div className="relative h-36 w-36 border border-violet-300 rounded-full cursor-pointer">
                  {avatarUrl ? (
                    <Image
                      src={`${avatarUrl}`}
                      width={144}
                      height={144}
                      alt="Profile photo"
                      className="rounded-full object-fill w-36 h-36"
                    />
                  ) : (
                    <>
                      {" "}
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
                    </>
                  )}
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
          disabled={Boolean(firstname)}
          render={({ field }) => (
            <FormItem>
              <FormLabel>firstname</FormLabel>
              <FormControl>
                <Input placeholder={firstname} {...field} />
              </FormControl>
              <FormDescription>Should be the same as your id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          disabled={Boolean(lastname)}
          render={({ field }) => (
            <FormItem>
              <FormLabel>lastname</FormLabel>
              <FormControl>
                <Input placeholder={lastname} {...field} />
              </FormControl>
              <FormDescription>Should be the same as your id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          disabled={Boolean(nationality)}
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
          name="university"
          disabled={Boolean(university)}
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
          disabled={Boolean(major)}
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
          disabled={Boolean(description)}
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
        <BtnPrimary type="submit">Save profile</BtnPrimary>
      </form>
    </Form>
  );
}
