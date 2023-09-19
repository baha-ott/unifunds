import Apply from "./apply";
import MobileNav from "./mobile-nav";

import NavigationList from "./navigation-list";

const MainNavigation = () => {
  return (
    <header className="flex items-center justify-between mx-auto h-24 px-4">
      <div className="flex gap-2">
        {/* navigation on mobile */}
        <MobileNav />
        <img src="/logo.png" width={100} alt="unifund logo" />
      </div>

      <NavigationList />
      {/* apply and login button */}
      <Apply />
    </header>
  );
};

export default MainNavigation;
