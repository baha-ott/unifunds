"use client";

import LoginForm from "@/components/loginForm/login";
import SignUpForm from "@/components/loginForm/signup";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface msg {
  msg: string;
  err: string;
}

export default function Login() {
  const [formStatus, setFormStatus] = useState<"sign-up" | "sign-in">(
    "sign-in"
  );

  const [{ msg, err }, setMsg] = useState<msg>({ msg: "", err: "" });

  const hanldFormStatusChange = (status: "sign-up" | "sign-in") => {
    setFormStatus(status);
  };

  const handleMessageChange = (msg: msg) => {
    setMsg(msg);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className=" w-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {formStatus === "sign-up" ? "Sign up" : "Sign in"}
          </CardTitle>
          <CardDescription>lets make a difference together</CardDescription>
        </CardHeader>

        <CardContent>
          {formStatus === "sign-up" ? (
            <SignUpForm
              changeFormStatus={hanldFormStatusChange}
              onChangeMsg={handleMessageChange}
            />
          ) : (
            <LoginForm
              changeFormStatus={hanldFormStatusChange}
              onChangeMsg={handleMessageChange}
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          {(msg || err) && (
            <Alert
              className={`mt-4 ${
                msg ? "bg-brand-primary" : "bg-red-600"
              } bg-opacity-10 text-gray-primary max-w-full`}
            >
              <div className="flex items-center gap-2 mb-2">
                {msg ? <AlertCircleIcon /> : <AlertTriangleIcon />}
                <AlertTitle>{err || "info"}</AlertTitle>
              </div>
              <AlertDescription className="max-w-xs">
                {msg || err}
              </AlertDescription>
            </Alert>
          )}
          <Image src="/logo.png" width={80} height={0} alt="unifunds logo" />
        </CardFooter>
      </Card>
    </div>
  );
}
