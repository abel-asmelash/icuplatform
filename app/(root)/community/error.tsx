"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service (or just console for now)
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="h1-bold text-3xl">Er ging iets mis</h1>
      <p className="text-light-500 dark:text-light-400 max-w-md">
        Er is een onverwachte fout opgetreden. Probeer het opnieuw of ga terug
        naar de homepage.
      </p>

      <div className="mt-4 flex gap-3">
        <Button
          onClick={() => reset()}
          className="primary-gradient text-light-900 rounded-md px-4 py-3"
        >
          Probeer opnieuw
        </Button>

        <Button variant="outline" className="rounded-md px-4 py-3" asChild>
          <Link href={ROUTES.HOME}>Terug naar home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;
