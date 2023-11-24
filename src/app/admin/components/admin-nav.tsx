"use client";
import MobileNav from "@/components/shared-components/navigation/mobile-nav";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathName = usePathname();
  const navItems = [
    {
      href: `/admin`,
      title: "Overview",
    },
    {
      href: `/admin/users`,
      title: "Users",
    },
    {
      href: `/admin/settings`,
      title: "Settings",
    },
    {
      href: `/admin/offers`,
      title: "Offers",
    },
  ];

  return (
    <nav className={cn("flex items-center ")}>
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
