// icon
import { ArrowRightIcon } from "lucide-react";
// next
import Link from "next/link";
// shadcn
import { Separator } from "../ui/separator";

interface Props {
  title: string;
  href: string;
}

function MobileNavItem({ title, href }: Props) {
  return (
    <li>
      <Link href={href} className="flex justify-between w-full">
        {title}
        <ArrowRightIcon />
      </Link>
      <Separator className="mt-2" />
    </li>
  );
}

export default MobileNavItem;
