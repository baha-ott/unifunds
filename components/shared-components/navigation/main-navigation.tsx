import Image from "next/image";
import Apply from "./apply";
import MobileNav from "./mobile-nav";

import NavigationList from "./navigation-list";
import Link from "next/link";


const MainNavigation = async () => {



  return (
    <header className="flex items-center justify-between mx-auto h-24 px-2 lg:px-12">
      <div className="flex gap-2">
        {/* navigation on mobile */}
        <MobileNav />
        <Link href="/" className="text-center">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="unifund logo, the logo is the word of unifund"
          />
        </Link>
      </div>
      <NavigationList />

      {/* apply and login button */}
      <Apply />
   
    </header>
  );
};

export default MainNavigation;
