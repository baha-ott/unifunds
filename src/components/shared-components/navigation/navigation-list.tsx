"use client";
import Image from "next/image";
// navigation-menu
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import TypographyH2 from "../typography/typographyH2";
import { TypographyP } from "../typography/typographyP";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { MoveUpRightIcon } from "lucide-react";

const NavigationList = () => {
  const programs = [
    {
      title: "Erasmus programs",
      description:
        "This program allows you to travel to study a semester in europe",
      imgSrc: "/imgs/programs/money.svg",
      suit: ["university students", "Master degrees"],
    },
    {
      title: "Unifunds programs",
      description:
        "These programms are funded by unifunds in partner with other instutions",
      imgSrc: "/imgs/programs/travel.svg",
      suit: ["Anyone wants to learn"],
    },
  ];

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="flex gap-8">
        <NavigationMenuItem>
          <NavigationMenuTrigger>programs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col  w-[200px]">
              {programs.map((p, i) => (
                <>
                  <div className="flex items-center max-w-2xl gap-2 px-2 py-4 cursor-pointer">
                    <TypographyH2 className="text-sm" title={p.title} />

                    <div className="w-6 h-6 bg-brand-primary bg-opacity-10 flex items-center justify-center rounded-full">
                      <MoveUpRightIcon className="text-brand-primary" />
                    </div>
                  </div>
                </>
              ))}
            </div>
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
  );
};

export default NavigationList;
