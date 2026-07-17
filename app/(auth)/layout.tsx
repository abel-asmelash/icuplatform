import { ReactNode } from "react";
import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
 import AuroraBg from "@/components/AuroraBg";
 import Animatedbg from "@/components/Animatedbg"
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light px-4 py-10">
      <Animatedbg />
      <AuroraBg />
      <section className="realtive light-border background-light900_dark200 shadow-light100 dark10 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-130 sm:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-primary-300 p-1.5 shadow-lg ring-2 ring-primary-500/30 hover:ring-primary-500 transition-all duration-300">
            <Image
              src="/assets/icu-logo.png"
              alt="icu logo"
              width={90}
              height={90}
              className="rounded-full hover:scale-105 hover:rotate-6 transition-all duration-300 animate-pulse-slow"
            />
          </div>
          <div className="space-y-2.5 animate-fade-in">
            <h1 className="h2-bold text-dark100 dark:text-light-900 animate-slide-down">
              Join Icu{" "}
              <span className="text-yellow-400 inline-block hover:scale-110 hover:rotate-3 transition-transform duration-300 animate-glow-text">
                Q&A
              </span>{" "}
              Platform
            </h1>
            <p className="paragraph-regular text-dark500 dark:text-light-400 animate-slide-up animation-delay-300 hover:translate-x-2 transition-transform duration-300">
              Krijg antwoord op je bijbelse vragen
            </p>
          </div>
        </div>

        {children}
        <SocialAuthForm />
        <div className="mt-6 text-center animate-fade-in">
          <div className="relative max-w-md mx-auto">
            {/* Decorative line */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-16 h-px bg-linear-to-r from-transparent via-yellow-400/40 to-transparent"></div>

            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-200 italic font-light tracking-wide leading-relaxed block animate-slide-up hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
              &ldquo;Komt een van u wijsheid tekort? <br />
              <span className="hover:text-yellow-600 dark:hover:text-yellow-400/80 transition-colors duration-300">
                Vraag God erom
              </span>{" "}
              en hij die aan iedereen geeft, zonder voorbehouden en zonder
              verwijt, zal u wijsheid geven&rdquo;
            </span>

            {/* Animated underline */}
            <div className="w-0 h-px bg-linear-to-r from-yellow-400/0 via-yellow-400/40 to-yellow-400/0 mx-auto mt-2 animate-expand-width"></div>

            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-300/70 font-light tracking-wider uppercase block mt-2 animate-slide-up animation-delay-200 hover:tracking-[0.2em] transition-all duration-500">
              — James 1:5
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
