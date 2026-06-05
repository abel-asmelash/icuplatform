import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTechBibleClassName = (tagName: string) => {
  if (!tagName) return "fa-book-bible";
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

// gettimeStamp
export function getTimeStamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
}