"use client";

import { useEffect } from "react";
import Link from "next/link";

const TagError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error("Tag page error:", error);
  }, [error]);

  return (
    <div className="flex-center mt-20 w-full flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900 text-3xl">
        Er ging iets mis
      </h1>
      <p className="paragraph-regular text-dark400_light700 max-w-md text-center">
        We konden deze pagina niet laden. Probeer het opnieuw.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="primary-gradient rounded-lg px-6 py-3 text-white"
        >
          Probeer opnieuw
        </button>
        <Link
          href="/tags"
          className="rounded-lg border px-6 py-3 text-dark400_light700"
        >
          Terug naar tags
        </Link>
      </div>
    </div>
  );
};

export default TagError;
