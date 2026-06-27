import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MetricProps {
  imageUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyle?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imageUrl,
  alt,
  value,
  title,
  textStyle,
  href,
  isAuthor,
}: MetricProps) => {
  const content = (
    <>
      <Image
        src={imageUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyle} flex items-center gap-1`}>
        {value}
        {title && (
          <span
            className={cn("small-regular line-clamp-1", {
              "max-sm:hidden": isAuthor,
            })}
          >
            {title}
          </span>
        )}
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {content}
      </Link>
    );
  }

  return <div className="flex-center gap-1">{content}</div>;
};

export default Metric;
