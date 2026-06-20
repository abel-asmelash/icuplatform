import Link from "next/link";
import Theme from "./Theme";
import Image from "next/image";
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

const Navbar = async() => {
  const session = await auth()
  return (
    <nav className="flex items-center justify-between fixed z-50 w-full gap-5 p-6 bg-white dark:bg-gray-900 shadow-md sm:px-12">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 shadow-lg">
          <Image
            src="/assets/icu-logo.png"
            alt="ICU icon"
            width={28}
            height={28}
            className="h-7 w-auto"
          />
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black font-space-grotesk text-primary-500">
            Ask <span className="text-foreground">ICU</span>
          </span>
          <span className="text-xs text-muted-foreground">
            Faith • Questions • Community
          </span>
        </div>
      </Link>
            
      <p>Global Search</p>

      <div className="flex items-center gap-5">
        <Theme />
        {session?.user?.id && (
          <UserAvatar id={session.user.id}
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
