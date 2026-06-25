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
// helper function

export const getTechBibleInfo = (
  tagName: string,
): { icon: string; color: string } => {
  if (!tagName) return { icon: "fa-book-bible", color: "bg-orange-400" };

  const normalizedTagName = tagName.replace(/[.\s]/g, "").toLowerCase();

  const tagMap: { [key: string]: { icon: string; color: string } } = {
    // 📖 Bible / Bijbel
    bible: { icon: "fa-book-bible", color: "bg-orange-400" },
    bijbel: { icon: "fa-book-bible", color: "bg-orange-400" },

    // ✝️ Faith / Geloof
    faith: { icon: "fa-hand-holding-heart", color: "bg-pink-500" },
    geloof: { icon: "fa-hand-holding-heart", color: "bg-pink-500" },

    // 🙏 Prayer / Gebed
    prayer: { icon: "fa-hands-praying", color: "bg-purple-500" },
    gebed: { icon: "fa-hands-praying", color: "bg-purple-500" },

    // 📜 Gospel / Evangelie
    gospel: { icon: "fa-book-open", color: "bg-green-500" },
    evangelie: { icon: "fa-book-open", color: "bg-green-500" },

    // ⛪ Church / Kerk
    theology: { icon: "fa-church", color: "bg-indigo-500" },
    theologie: { icon: "fa-church", color: "bg-indigo-500" },
    kerk: { icon: "fa-church", color: "bg-indigo-500" },
    icu: { icon: "fa-church", color: "bg-indigo-500" },

    // 🕊️ Worship / Aanbidding
    worship: { icon: "fa-place-of-worship", color: "bg-rose-500" },
    aanbidding: { icon: "fa-place-of-worship", color: "bg-rose-500" },

    // 📣 Prophecy / Profetie
    prophecy: { icon: "fa-scroll", color: "bg-yellow-500" },
    profetie: { icon: "fa-scroll", color: "bg-yellow-500" },

    // 🌿 Grace / Genade
    grace: { icon: "fa-dove", color: "bg-sky-400" },
    genade: { icon: "fa-dove", color: "bg-sky-400" },

    // 📣 Calling / Roeping
    calling: { icon: "fa-bullhorn", color: "bg-teal-500" },
    roeping: { icon: "fa-bullhorn", color: "bg-teal-500" },

    // ✝️ Apostles / Apostelen
    apostles: { icon: "fa-cross", color: "bg-gray-500" },
    apostelen: { icon: "fa-cross", color: "bg-gray-500" },

    // 📖 Old Testament / Oude Testament
    oldtestament: { icon: "fa-book", color: "bg-amber-700" },
    oudetestament: { icon: "fa-book", color: "bg-amber-700" },

    // 📖 New Testament / Nieuwe Testament
    newtestament: { icon: "fa-scroll", color: "bg-yellow-400" },
    nieuwtestament: { icon: "fa-scroll", color: "bg-yellow-400" },

    // 🌍 Community / Gemeenschap
    community: { icon: "fa-people-group", color: "bg-cyan-500" },
    gemeenschap: { icon: "fa-people-group", color: "bg-cyan-500" },
    gouda: { icon: "fa-people-group", color: "bg-cyan-500" },

    // ⭐ Salvation / Verlossing
    salvation: { icon: "fa-star-of-david", color: "bg-yellow-400" },
    verlossing: { icon: "fa-star-of-david", color: "bg-yellow-400" },

    // 📚 Greek Bible
    greekbible: { icon: "fa-bookmark", color: "bg-blue-500" },
    grieksbijbel: { icon: "fa-bookmark", color: "bg-blue-500" },

    // 🕊️ Dove / Duif
    dove: { icon: "fa-dove", color: "bg-sky-300" },
    duif: { icon: "fa-dove", color: "bg-sky-300" },
  };

  return (
    tagMap[normalizedTagName] || {
      icon: "fa-book-bible",
      color: "bg-orange-400",
    }
  );
};