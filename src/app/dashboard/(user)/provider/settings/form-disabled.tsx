"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import BtnPrimary from "@/components/shared-components/btn-primary";
import Image from "next/image";

export default function ProfileFormDisabled() {
  return (
    <form className="space-y-8">
      <FormField
        name="avatar"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Profile picture</FormLabel>

              <div className="relative h-36 w-36 border border-violet-300 rounded-full cursor-pointer">
                <Image
                  src={field.value}
                  width={144}
                  height={144}
                  alt="Profile photo"
                  className="rounded-full object-fill w-36 h-36"
                />
              </div>

              <FormDescription>
                We use your profile picture to identify it with your id make
                sure to user a real photo of you
              </FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        name="firstname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>firstname</FormLabel>

            <Input placeholder={field.value} disabled={true} {...field} />

            <FormDescription>Should be the same as your id</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="lastname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>lastname</FormLabel>

            <Input placeholder={field.value} disabled={true} {...field} />

            <FormDescription>Should be the same as your id</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality</FormLabel>

            <Input
              placeholder={field.value ? field.value : "Palestinian"}
              disabled={true}
              {...field}
            />

            <FormDescription>
              For double citizen students enter as this format
              spanish-palestinian
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="university"
        render={({ field }) => (
          <FormItem>
            <FormLabel>University</FormLabel>

            <Input
              placeholder={
                field.value ? field.value : "Al-Quds open university"
              }
              disabled={true}
              {...field}
            />

            <FormDescription>
              You have to be studying at palestinian university
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="major"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Major</FormLabel>

            <Input
              placeholder={field.value ? field.value : "Computer Science"}
              disabled={true}
              {...field}
            />

            <FormDescription>What are you studying</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descreption</FormLabel>

            <Textarea
              placeholder={
                field.value ? field.value : "Tell us about your self  "
              }
              disabled={true}
              {...field}
            />

            <FormDescription>
              Tell us more about your self to know you better
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <BtnPrimary type="submit">Save profile</BtnPrimary>
    </form>
  );
}
