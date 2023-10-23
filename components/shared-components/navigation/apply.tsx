"use client";
import Link from "next/link";
import BtnPrimary from "../btn-primary";

const Apply = () => {


  return (
    <div className="flex items-center gap-4">
      <BtnPrimary>
        <Link href="/sign-up">Apply now</Link>
      </BtnPrimary>
    </div>
  );
};

export default Apply;
