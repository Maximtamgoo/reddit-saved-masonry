import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

export function useWindowWidth() {
  return useSyncExternalStore(subscribe, () => window.innerWidth);
}
