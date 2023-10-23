"use client";
import Link from "next/link";
import { Button } from "../../ui/button";
import BtnPrimary from "../btn-primary";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Apply = () => {
  const supabase = createClientComponentClient();

  return (
    <div className="flex items-center gap-4">
      <BtnPrimary>
        <Link href="/sign-up">Apply now</Link>
      </BtnPrimary>

      <button onClick={() => supabase.auth.signOut()}>logout</button>
    </div>
  );
};

export default Apply;
