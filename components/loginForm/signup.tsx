"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const formSchema = z
  .object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

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
import { msg } from "@/app/sign-up/page";
import { useState } from "react";
import BtnFormSubmit from "./BtnFormSubmit";

export default function SignUpForm({
  changeFormStatus,
  onChangeMsg,
}: {
  changeFormStatus: (status: "sign-up" | "sign-in") => void;
  onChangeMsg: (msg: msg) => void;
}) {
  // contriolling form states
  const [state, setState] = useState<"loading" | "submitted" | "">("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    setState("loading");
    const signUP = async () => {
      const res = await fetch("/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const supabaseRes = await res.json();


      if (!supabaseRes.error) {
        onChangeMsg({ msg: "Check your inbox to confirm your email", err: "" });
      }
      if (supabaseRes.error) {
        onChangeMsg({ msg: "", err: supabaseRes.error.message });
      }

      setState("submitted");

      return;
    };

    signUP();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <BtnFormSubmit
          title="sign up"
          loadingTitle="signing up"
          state={state}
        />
        <FormDescription>
          already have an account{" "}
          <span
            className="hover:cursor-pointer text-blue-600"
            onClick={() => changeFormStatus("sign-in")}
          >
            log in now
          </span>
        </FormDescription>
      </form>
    </Form>
  );
}
