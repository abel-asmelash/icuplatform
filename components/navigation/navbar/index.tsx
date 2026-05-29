import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between fixed z-50 w-full gap-5 p-6 bg-white dark:bg-gray-900 shadow-md sm:px-12">
      <Link href={"/"} className="flex items-center gap-1">
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hide">
          {/* ICU */}
          <img 
  src="/assets/icu-icon.png" 
  alt="ICU icon" 
  className="h-8 w-auto"
/>

          <span className="text-primary-500 ">Forum</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">Theme</div>
    </nav>
  );
};

export default Navbar;
