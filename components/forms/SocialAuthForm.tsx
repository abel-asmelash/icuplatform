"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "sonner";
import ROUTES from "@/constants/routes";
const SocialAuthForm = () => {
  const handleSignIn = async (provider: "google") => {
    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
      if (result?.error) {
        toast.error("Sign-in failed. Please try again later");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occured during sign-in",
      );
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <button
        className="group relative flex min-h-12 flex-1 items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500"
        onClick={() => handleSignIn("google")}  
      >
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:from-blue-950/20 dark:to-indigo-950/20" />
        <Image
          src="/assets/google-logo.svg.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="relative z-10 rounded-full transition-transform duration-200 group-hover:scale-105"
        />
        <span className="relative z-10 text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default SocialAuthForm;
