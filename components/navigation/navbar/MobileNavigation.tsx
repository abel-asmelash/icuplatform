import Image from "next/image";
import { auth, signOut } from "@/auth";
 
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import NavLinks from "./NavLinks";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;
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
                <span className="text-primary-500">Q&AForum</span>
              </p>
            </Link>
          </SheetHeader>
          <SheetClose className="flex flex-col gap-6 pt-16">
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav userId={userId} />
            </section>
          </SheetClose>
          <div className="flex flex-col gap-3">
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button
                    type="submit"
                    className="base-medium w-fit `bg-transparent!` px-4 py-3"
                  >
                    <LogOut className="size-5 text-black dark:text-white" />
                    <span className=" text-dark300_light900">
                      Logout
                    </span>
                  </Button>
                </form>
              </SheetClose>
            ) : null}
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary `min-h-10.25` w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign Up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
