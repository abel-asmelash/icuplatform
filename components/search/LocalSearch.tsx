"use client"
import { Input } from "../ui/input";
import Image from "next/image";

interface LocalSearchProps {
  imgSrc: string;  
  placeholder: string; 
  otherClasses?: string;  
}

const LocalSearch = ({imgSrc, placeholder}: LocalSearchProps) => {
  return (
    <div className="background-light800_darkgradient flex min-h-14 grow items-center gap-4 rounded-[10px] px-4">
      <Image
        src={imgSrc}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer dark:invert"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value="search "
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
