"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import MobileNav from "@/components/shared-components/navigation/mobile-nav";
import { useContext } from "react";
import { UserContext } from "../../provider/UserProvider";
import AdminNav from "../../(user)/admin/components/admin-nav";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();

  const { role } = useContext(UserContext);

  const navItems = [
    {
      href: `/dashboard/${role}`,
      title: "Overview",
    },
    {
      href: `/dashboard/${role}/settings`,
      title: "Settings",
    },
  ];

  if (role === "admin") {
    return <AdminNav />;
  }

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
