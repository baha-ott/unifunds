import { Button } from "@/components/ui/button";
import Link from "next/link";
import BtnPrimary from "../btn-primary";

const Apply = () => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" className="">
        <Link href="/">Log in</Link>
      </Button>
      <BtnPrimary>
        <Link href="/">Apply now</Link>
      </BtnPrimary>
    </div>
  );
};

export default Apply;
