import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  // static values
  maxLanesLimit: number;
  minCardSize: number;
  // user values
  maxLanes: number;
  maxCardWidth: number;
  maxCardHeight: number;
  actions: {
    setMaxLanes: (maxLanes: number) => void;
    setMaxCardWidth: (px: number) => void;
    setMaxCardHeight: (px: number) => void;
    resetCardSizes: () => void;
    resetMaxLanes: () => void;
  };
}

const minCardSize = 350;
const initCardWidth = Math.floor((window.screen.availWidth / 100) * 25);
const initCardHeight = Math.floor((window.screen.availHeight / 100) * 75);

export const useSettingsStore = create<State>()(
  persist(
    (set, _, store) => ({
      // static values
      maxLanesLimit: 5,
      minCardSize,
      // user values
      maxLanes: 3,
      maxCardWidth: Math.max(minCardSize, initCardWidth),
      maxCardHeight: Math.max(minCardSize, initCardHeight),
      actions: {
        setMaxLanes(maxLanes) {
          set({ maxLanes });
        },
        setMaxCardWidth(px) {
          set({ maxCardWidth: px });
        },
        setMaxCardHeight(px) {
          set({ maxCardHeight: px });
        },
        resetCardSizes() {
          //! getInitialState might be from localstorage and not reset to actual default
          const { maxCardWidth, maxCardHeight } = store.getInitialState();
          set({ maxCardWidth, maxCardHeight });
        },
        resetMaxLanes() {
          set({ maxLanes: store.getInitialState().maxLanes });
        },
      },
    }),
    {
      name: "settings",
      partialize: (s) => ({
        // maxLanes: s.maxLanes,
        //! resetCardSizes issue
        // maxCardWidth: s.maxCardWidth,
        // maxCardHeight: s.maxCardHeight,
      }),
    },
  ),
);
