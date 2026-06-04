"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold text-dark100_light900">
        Something went wrong
      </h1>
      <p className="paragraph-regular text-dark500_light400 max-w-md">
        An unexpected error occurred. Please try again or return to the home
        page.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => unstable_retry()} variant="outline">
          Try Again
        </Button>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
