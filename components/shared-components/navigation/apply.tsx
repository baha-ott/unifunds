import { Button } from "@/components/ui/button";
import Link from "next/link";
import BtnPrimary from "../btn-primary";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

const Apply = async () => {
  const session = await getServerSession(options);

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" className="">
        {!session ? (
          <Link href="/api/auth/signin">Log in</Link>
        ) : (
          <Image
            src={session.user?.image || ""}
            alt={`${session.user?.name} profile picture`}
            height={30}
            width={30}
            className="rounded-full"
          />
        )}
      </Button>
      <BtnPrimary>
        <Link href="/">Apply now</Link>
      </BtnPrimary>
    </div>
  );
};

export default Apply;
