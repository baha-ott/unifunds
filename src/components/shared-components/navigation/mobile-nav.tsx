// sheet
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

// icons
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MenuIcon,
} from "lucide-react";

// components
import MobileNavItem from "@/components/mobile/mobile-navItem";

const MobileNav = ({
  items,
  title,
}: {
  items: { title: string; href: string }[];
  title: string;
}) => {
  return (
    <div className="lg:hidden flex gap-4">
      <Sheet>
        <SheetTrigger aria-label="open nav button">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>

          <ul className="mt-8 flex flex-col gap-8">
            {items.map((props) => (
              <MobileNavItem key={props.title} {...props} />
            ))}
          </ul>

          <SheetFooter className="mt-auto">
            <div className="flex items-center gap-4">
              <Link href="/">
                <FacebookIcon />
              </Link>
              <Link href="/">
                <InstagramIcon />
              </Link>

              <Link href="/">
                <LinkedinIcon />
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
