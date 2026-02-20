import { create } from "zustand";
// import { persist } from "zustand/middleware";

interface State {
  // static values
  MAX_LANES_LIMIT: number;
  MIN_CARD_SIZE: number;
  // user values
  maxLanes: number;
  userCardWidth: number;
  userCardHeight: number;
  actions: {
    setMaxLanes: (maxLanes: number) => void;
    setUserCardWidth: (px: number) => void;
    setUserCardHeight: (px: number) => void;
    resetCardSizes: () => void;
    resetMaxLanes: () => void;
  };
}

const MAX_LANES_LIMIT = 5;
const DEFAULT_MAX_LANES = 3;
const MIN_CARD_SIZE = 350;

const cardWidth = Math.floor((window.screen.availWidth / 100) * 25);
const userCardWidth = Math.max(MIN_CARD_SIZE, cardWidth);
const cardHeight = Math.floor((window.screen.availHeight / 100) * 75);
const userCardHeight = Math.max(MIN_CARD_SIZE, cardHeight);

export const useSettingsStore = create<State>()((set) => ({
  // static values
  MAX_LANES_LIMIT,
  MIN_CARD_SIZE,
  // user values
  maxLanes: DEFAULT_MAX_LANES,
  userCardWidth,
  userCardHeight,
  actions: {
    setMaxLanes(maxLanes) {
      set({ maxLanes });
    },
    resetMaxLanes() {
      set({ maxLanes: DEFAULT_MAX_LANES });
    },
    setUserCardWidth(v) {
      set({ userCardWidth: Math.floor((window.screen.availWidth / 100) * v) });
    },
    setUserCardHeight(v) {
      set({ userCardHeight: Math.floor((window.screen.availHeight / 100) * v) });
    },
    resetCardSizes() {
      set({ userCardWidth, userCardHeight });
    },
  },
}));
