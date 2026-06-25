"use client";
import { Input } from "../ui/input";
import Image from "next/image";

interface LocalSearchProps {
  route: string
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
  iconPosition: "left" | "right";
}

const LocalSearch = ({
  imgSrc,
  placeholder,

  otherClasses,
  iconPosition = "left"
}: LocalSearchProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer dark:invert"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={15}
          height={15}
          className="cursor-pointer dark:invert"
        />
      )}
    </div>
  );
};

export default LocalSearch;
