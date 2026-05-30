import { ReactNode } from "react";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light dark:bg-auth-dark bg-cover bg-center bg-no-repeat px-4 py-10">
      <section className="light-border background-light800_dark200 shadow-light100 dark10 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100 light900">
              Join Icu <span className="text-yellow-400"> Q&A </span>Platform
            </h1>
            <p className="paragraph-regular text-dark500 light400">
              {" "}
              To Get Your Biblical Quesions Answered
            </p>
          </div>
          <img
            src="/assets/icu-icon.png"
            alt="icu logo"
            width={100}
            height={80}
            className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-blue-400"
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
