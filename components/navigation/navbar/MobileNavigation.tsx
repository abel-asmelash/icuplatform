"use client";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthButtons from "../AuthButtons";
import { ReactNode } from "react";

const SheetCloseWrapper = ({ children }: { children: ReactNode }) => (
  <SheetClose asChild>{children}</SheetClose>
);

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden">
          <Image
            src="/assets/humbergur.svg"
            width={36}
            height={36}
            alt="Menu"
            className="invert-colors"
          />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <div className="flex flex-col h-full justify-between">
          <SheetHeader>
            <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/assets/icu-logo.svg"
                alt="Logo"
                width={23}
                height={23}
              />
              <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
                <span className="text-primary-500 ">Q&AForum</span>
              </p>
            </Link>
          </SheetHeader>
          <SheetClose className="flex flex-col gap-6 pt-16 ">
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>
          <AuthButtons wrapper={SheetCloseWrapper} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
