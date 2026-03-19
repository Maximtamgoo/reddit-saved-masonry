import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  // static values
  MAX_LANES_LIMIT: number;
  MIN_CARD_WIDTH: number;
  MIN_CARD_HEIGHT: number;
  // user values
  maxLanes: number;
  cardWidthPercent: number;
  cardHeightPercent: number;

  actions: {
    setMaxLanes: (maxLanes: number) => void;
    setCardWidthPercent: (px: number) => void;
    setCardHeightPercent: (px: number) => void;
    resetMaxLanes: () => void;
    resetCardSizes: () => void;
  };
}

const MAX_LANES_LIMIT = 5;
const MAX_LANES = 3;
const CARD_WIDTH_PERCENT = 25;
const CARD_HEIGHT_PERCENT = 75;
const MIN_CARD_WIDTH = 350;
const MIN_CARD_HEIGHT = 250;

export const useSettingsStore = create<State>()(
  persist(
    (set) => ({
      // static values
      MAX_LANES_LIMIT,
      MIN_CARD_WIDTH,
      MIN_CARD_HEIGHT,
      // user values
      maxLanes: MAX_LANES,
      cardWidthPercent: CARD_WIDTH_PERCENT,
      cardHeightPercent: CARD_HEIGHT_PERCENT,
      actions: {
        setMaxLanes(maxLanes) {
          set({ maxLanes });
        },
        setCardWidthPercent(cardWidthPercent) {
          set({ cardWidthPercent });
        },
        setCardHeightPercent(cardHeightPercent) {
          set({ cardHeightPercent });
        },
        resetMaxLanes() {
          set({ maxLanes: MAX_LANES });
        },
        resetCardSizes() {
          set({
            cardWidthPercent: CARD_WIDTH_PERCENT,
            cardHeightPercent: CARD_HEIGHT_PERCENT,
          });
        },
      },
    }),
    {
      name: "settings",
      partialize: ({ maxLanes, cardWidthPercent, cardHeightPercent }) => ({
        maxLanes,
        cardWidthPercent,
        cardHeightPercent,
      }),
    },
  ),
);
