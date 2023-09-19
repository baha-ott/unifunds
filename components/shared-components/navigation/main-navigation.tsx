"use client";
// next.js
import Link from "next/link";
// navigation-menu
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import MobileNav from "./mobile-nav";
import BtnPrimary from "../btn-primary";
import { Button } from "@/components/ui/button";

function MainNavigation({}) {
  return (
    <>
      <header className="flex items-center justify-between mx-auto h-24 px-4">
        <MobileNav />
        <div aria-label="logo">unifunds🎓</div>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger>programs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-[400px] gap-4 px-2 py-4">
                  <li>test1</li>
                  <li>test2</li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>partnerships</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-[400px] gap-4 px-2 py-4">
                  <li>test1</li>
                  <li>test2</li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>Blog</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Link href="/">Log in</Link>
          </Button>
          <BtnPrimary>
            <Link href="/">Apply now</Link>
          </BtnPrimary>
        </div>
      </header>
    </>
  );
}

export default MainNavigation;
