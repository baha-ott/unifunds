"use client";

import LoginForm from "@/components/loginForm/login";
import SignUpForm from "@/components/loginForm/signup";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export interface msg {
  msg: string;
  err: string;
}

export default function Login() {
  const [formStatus, setFormStatus] = useState<"sign-up" | "sign-in">(
    "sign-up"
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
      <div className="shadow-md px-4 pt-2 pb-8 rounded-sm w-96">
        <Image src="/logo.png" width={100} height={50} alt="unifunds logo" />
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
      </div>
    </div>
  );
}
