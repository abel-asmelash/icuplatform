import { DEFAULT_EMPITY } from "@/constants/states";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: T[] | null | undefined;
  empty: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => (
  <div className="mt-16 flex flex-col items-center gap-4">
    <Image
      src={image.light}
      alt={image.alt}
      width={270}
      height={200}
      className="object-contain dark:hidden"
    />
    <Image
      src={image.dark}
      alt={image.alt}
      width={270}
      height={200}
      className="hidden object-contain dark:block"
    />
    <h2 className="h2-bold text-dark200_light900">{title}</h2>
    <p className="body-regular text-light-500 max-w-md text-center">
      {message}
    </p>
    {button && (
      <Link
        href={button.href}
        className="mt-4 primary-gradient rounded-md px-4 py-3 text-light-900"
      >
        {button.text}
      </Link>
    )}
  </div>
);

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty = DEFAULT_EMPITY,
  render,
}: Props<T>) => {
  if (!success) {
    return (
      <StateSkeleton
        image={{
          light: "/assets/error_message.svg",
          dark: "/assets/error_message.svg",
          alt: "Error illustration",
        }}
        title="Something went wrong"
        message={error?.message ?? "An unexpected error occurred."}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <StateSkeleton
        image={{
          light: "/assets/question_notfound.svg",
          dark: "/assets/question_notfound.svg",
          alt: "Empty state illustration",
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  }

  return <>{render(data)}</>;
};

export default DataRenderer;
