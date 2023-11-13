"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import MobileNav from "@/components/shared-components/navigation/mobile-nav";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();

  const navItems = [
    {
      href: `/dashboard/student`,
      title: "Overview",
    },
    {
      href: `/dashboard/student/settings`,
      title: "Settings",
    },
  ];

  return (
    <nav className={cn("flex items-center ", className)} {...props}>
      <MobileNav items={navItems} title="Dashboard" />
      <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
        {navItems.map(({ href, title }) => (
          <Link
            key={title}
            href={href}
            className={`font-medium ${
              pathName !== href ? "text-sm text-muted-foreground" : "text-md"
            } transition-colors hover:text-primary`}
          >
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
