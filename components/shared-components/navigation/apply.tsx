"use client";
import Link from "next/link";
import { Button } from "../../ui/button";
import BtnPrimary from "../btn-primary";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Apply = () => {
  const supabase = createClientComponentClient();

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline">
        <Link href="/login">login</Link>
      </Button>
      <BtnPrimary>
        <Link href="/login">Apply now</Link>
      </BtnPrimary>

      <button onClick={() => supabase.auth.signOut()}>logout</button>
    </div>
  );
};

export default Apply;
