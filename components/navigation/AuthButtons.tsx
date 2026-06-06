import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { ReactNode } from "react";

interface AuthButtonsProps {
  showIcons?: boolean;
  wrapper?: (props: { children: ReactNode }) => ReactNode;
}

const PassthroughWrapper = ({ children }: { children: ReactNode }) => children;

const AuthButtons = ({ showIcons = false, wrapper }: AuthButtonsProps) => {
  const Wrapper = wrapper ?? PassthroughWrapper;

  return (
    <div className="flex flex-col gap-3">
      <Wrapper>
        <Button
          className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
          asChild
        >
          <Link href={ROUTES.SIGN_IN}>
            {showIcons && (
              <Image
                src="/assets/account.svg"
                alt="Account"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
            )}
            <span className={`primary-text-gradient font-bold${showIcons ? " max-lg:hidden" : ""}`}>
              Log In
            </span>
          </Link>
        </Button>
      </Wrapper>
      <Wrapper>
        <Button
          className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
          asChild
        >
          <Link href={ROUTES.SIGN_UP}>
            {showIcons && (
              <Image
                src="/assets/single.svg"
                alt="Account"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
            )}
            <span className={`primary-text-gradient font-bold${showIcons ? " max-lg:hidden" : ""}`}>
              Sign Up
            </span>
          </Link>
        </Button>
      </Wrapper>
    </div>
  );
};

export default AuthButtons;
