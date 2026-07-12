import { ReactNode } from "react";
import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
 import AuroraBg from "@/components/AuroraBg";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light px-4 py-10">
      <AuroraBg />
      <section className="realtive light-border background-light900_dark200 shadow-light100 dark10 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-130 sm:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-primary-300 p-1.5 shadow-lg ring-2 ring-primary-500/30 hover:ring-primary-500 transition-all duration-300">
            <Image
              src="/assets/icu-logo.png"
              alt="icu logo"
              width={90}
              height={90}
              className="rounded-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100 dark:text-light-900">
              Join Icu <span className="text-yellow-400">Q&A</span> Platform
            </h1>
            <p className="paragraph-regular text-dark500 dark:text-light-400">
              Krijg antwoord op je bijbelse vragen
            </p>
          </div>
        </div>

        {children}
        <SocialAuthForm />
        <div className="mt-6 text-center">
          <span className="text-xs sm:text-sm text-gray-200 italic font-light tracking-wide leading-relaxed block max-w-md mx-auto">
            “Komt een van u wijsheid tekort? <br /> Vraag God erom en hij die aan iedereen geeft, zonder voorbehouden en zonder verwijt, zal u wijsheid geven”
          </span>
          <span className="text-[10px] sm:text-xs text-gray-300/70 font-light tracking-wider uppercase block mt-1">
            — James 1:5
          </span>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
