"use client";
import Link from "next/link";
import BtnPrimary from "../btn-primary";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Apply = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getUser() {
      const supabase = createClientComponentClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user.email?.at(0) || "");
      }
    }

    getUser();
  }, []);
  return (
    <div className="flex items-center gap-4">
      {user ? (
        <BtnPrimary>
          <Link href="/dashboard">Dashboard</Link>
        </BtnPrimary>
      ) : (
        <>
          {" "}
          <Link href="/login">login</Link>
          <BtnPrimary>
            <Link href="/sign-up">Apply now</Link>
          </BtnPrimary>
        </>
      )}
    </div>
  );
};

export default Apply;
