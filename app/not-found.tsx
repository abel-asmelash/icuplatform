import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-6xl font-bold text-primary-500">404</h1>
      <h2 className="text-2xl font-semibold text-dark100_light900">
        Page Not Found
      </h2>
      <p className="paragraph-regular text-dark500_light400 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
