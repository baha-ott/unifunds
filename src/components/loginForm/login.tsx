"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

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

import { useContext, useState } from "react";
import BtnFormSubmit from "@/components/shared-components/BtnFormSubmit";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserContext } from "@/app/dashboard/provider/UserProvider";

export default function LoginForm({
  changeFormStatus,
  onChangeMsg,
}: {
  changeFormStatus: (status: "sign-up" | "sign-in") => void;
  onChangeMsg: (msg: { msg: string; err: string }) => void;
}) {
  const [state, setState] = useState<"loading" | "submitted" | "">("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { role } = useContext(UserContext);

  if (role) {
    if (role !== "user" && role != "admin") {
      router.push(`/dashboard/${role}`);

      return;
    }

    router.push("/dashboard");
    return;
  }

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    setState("loading");
    const signIn = async () => {
      const res = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const supabaseRes = await res.json();

      if (supabaseRes.error) {
        onChangeMsg({ msg: "", err: supabaseRes.error.message });
        setState("");
        return;
      }

      if (role !== "user") {
        if (role === "admin") {
          router.push("/admin");
          return;
        }
        router.push(`/dashboard/${role}`);
        return;
      }

      router.push("/dashboard");

      setState("submitted");
      return;
    };

    signIn();
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
        <BtnFormSubmit title="log in" loadingTitle="logging in" state={state} />
        <FormDescription>
          {" don't have an account"}
          <span
            className="hover:cursor-pointer text-blue-600"
            onClick={() => changeFormStatus("sign-up")}
          >
            sign up now
          </span>
        </FormDescription>
      </form>
    </Form>
  );
}

/*
{
    "data": {
        "user": {
            "id": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7",
            "aud": "authenticated",
            "role": "authenticated",
            "email": "test@email.com",
            "email_confirmed_at": "2023-10-21T19:45:40.83249936Z",
            "phone": "",
            "last_sign_in_at": "2023-10-21T19:45:40.834840388Z",
            "app_metadata": {
                "provider": "email",
                "providers": [
                    "email"
                ]
            },
            "user_metadata": {},
            "identities": [
                {
                    "id": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7",
                    "user_id": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7",
                    "identity_data": {
                        "email": "test@email.com",
                        "sub": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7"
                    },
                    "provider": "email",
                    "last_sign_in_at": "2023-10-21T19:45:40.831036975Z",
                    "created_at": "2023-10-21T19:45:40.831057Z",
                    "updated_at": "2023-10-21T19:45:40.831057Z"
                }
            ],
            "created_at": "2023-10-21T19:45:40.82861Z",
            "updated_at": "2023-10-21T19:45:40.836532Z"
        },
        "session": {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk3OTIxMTQwLCJpYXQiOjE2OTc5MTc1NDAsInN1YiI6ImE2Mjk4M2Y5LWY2ODAtNGJiZC1hNWQ2LTQ5YTkwYWU4NWRjNyIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY5NzkxNzU0MH1dLCJzZXNzaW9uX2lkIjoiMTRlMjM2NjEtZmMyZC00ZWYxLThiNjUtMzlmMWY0YWMyMzA0In0.OqSTNNgs1_U-6Mq-yxr9jEO6sc8eHujnx6Y-LWO6gPE",
            "token_type": "bearer",
            "expires_in": 3600,
            "expires_at": 1697921140,
            "refresh_token": "uoPba-s-EDiBC_1YFXrs6A",
            "user": {
                "id": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7",
                "aud": "authenticated",
                "role": "authenticated",
                "email": "test@email.com",
                "email_confirmed_at": "2023-10-21T19:45:40.83249936Z",
                "phone": "",
                "last_sign_in_at": "2023-10-21T19:45:40.834840388Z",
                "app_metadata": {
                    "provider": "email",
                    "providers": [
                        "email"
                    ]
                },
                "user_metadata": {},
                "identities": [
                    {
                        "id": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7",
                        "user_id": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7",
                        "identity_data": {
                            "email": "test@email.com",
                            "sub": "a62983f9-f680-4bbd-a5d6-49a90ae85dc7"
                        },
                        "provider": "email",
                        "last_sign_in_at": "2023-10-21T19:45:40.831036975Z",
                        "created_at": "2023-10-21T19:45:40.831057Z",
                        "updated_at": "2023-10-21T19:45:40.831057Z"
                    }
                ],
                "created_at": "2023-10-21T19:45:40.82861Z",
                "updated_at": "2023-10-21T19:45:40.836532Z"
            }
        }
    },
    "error": null
}

*/
