"use client";
// navigation-menu
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";

const NavigationList = () => {
  return (
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
  );
};

export default NavigationList;
