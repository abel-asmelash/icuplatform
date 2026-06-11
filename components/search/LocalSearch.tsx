"use client"
import { Input } from "../ui/input";
import Image from "next/image";
const LocalSearch = () => {
  return (
    <div className="background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4">
      <Image
        src="/assets/search.svg"
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer dark:invert"
      />
      <Input
        type="text"
        placeholder="search..."
        value="search "
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
