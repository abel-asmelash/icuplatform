import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

export function useMediaQuery(query: string) {
  const matches = useSyncExternalStore(
    (callback) => subscribe(query, callback), // subscribe
    () => window.matchMedia(query).matches, // client snapshot
    () => false, // server snapshot
  );

  return matches;
}
