import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTechBibleClassName = (tagName: string) => {
  if(!tagName) return "fa-book-bible"
  const normalizedTagName = tagName.replace(/[.\s]/g, "").toLowerCase();

  const tagIconMap: { [key: string]: string } = {
    bible: "fa-book-bible",
    apostles: "fa-cross",
    newtestament: "fa-scroll",
    oldtestament: "fa-book",
    theology: "fa-church",
    greekbible: "fa-bookmark",
    prayer: "fa-hands-praying",
    dove: "fa-dove",
    worship: "fa-place-of-worship",
    starofdavid: "fa-star-of-david",
    faith: "fa-hand-holding-heart",
    gospel: "fa-book-open",
  };

  return tagIconMap[normalizedTagName] || "fa-book-bible";
};
