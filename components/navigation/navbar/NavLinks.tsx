"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
 

const NavLinks =  ({ isMobileNav = false }: { isMobileNav?: boolean, userId?: string}) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        const Icon = item.icon;

        return (
          <Link
            href={item.route}
            key={item.label}
            className={`flex items-center gap-4 p-4 rounded-lg ${
              isActive
                ? "primary-gradient text-light-900"
                : "text-dark300_light900"
            } ${isMobileNav ? "w-full" : ""}`}
          >
            <Icon
              size={20}
              weight={isActive ? "fill" : "regular"}
              className={isActive ? "text-light-900" : "text-dark300_light900"}
            />
            <p
              className={`${isMobileNav ? "base-medium" : "base-medium max-lg:hidden"} ${
                isActive ? "text-light-900" : "text-dark300_light900"
              }`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
