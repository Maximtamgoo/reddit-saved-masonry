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

export const useSettingsStore = create<State>()(
  // persist(
  (set, _, store) => ({
    // static values
    maxLanesLimit: 5,
    minCardSize: 350,
    // user values
    maxLanes: 3,
    maxCardWidth: (window.screen.availWidth / 100) * 25,
    maxCardHeight: (window.screen.availHeight / 100) * 80,
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
        const { maxCardWidth, maxCardHeight } = store.getInitialState();
        set({ maxCardWidth, maxCardHeight });
      },
      resetMaxLanes() {
        set({ maxLanes: store.getInitialState().maxLanes });
      },
    },
  }),
  //   {
  //     name: "settings",
  //   },
  // ),
);
