import Link from "next/link";
import Theme from "./Theme";
import Image from "next/image";
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import LanguageToggle from "@/components/LanguageToggle";
 
 
const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between fixed z-50 w-full gap-3 px-4 py-4 bg-white dark:bg-gray-900 shadow-md sm:gap-5 sm:px-12 sm:py-6">
      <Link href="/" className="flex shrink-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 shadow-lg">
          <Image
            src="/assets/icu-logo.png"
            alt="ICU icon"
            width={50}
            height={50}
            className="h-8 w-auto rounded-2xl shadow-2xl"
          />
        </div>

        <div className="hidden flex-col leading-none sm:flex">
          <span className="text-2xl font-black font-space-grotesk text-primary-500">
            Ask <span className="text-foreground">ICU</span>
          </span>
          <span className="text-xs text-muted-foreground">
            Faith • Questions • Community
          </span>
        </div>
      </Link>

       <LanguageToggle />

      <div className="flex shrink-0  items-center gap-3 sm:gap-5">
        <Theme />
        {session?.user?.id && (
          <UserAvatar
            id={session.user.id}
            name={session.user.name!}
            imageUrl={session.user?.image}
          />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
