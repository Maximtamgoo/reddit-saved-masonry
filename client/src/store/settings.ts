import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  // static values
  MAX_LANES_LIMIT: number;
  MIN_CARD_SIZE: number;
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
const DEFAULT_MAX_LANES = 3;
const DEFAULT_CARD_WIDTH_PERCENT = 25;
const DEFAULT_CARD_HEIGHT_PERCENT = 75;
const MIN_CARD_SIZE = 350;

export const useSettingsStore = create<State>()(
  persist(
    (set) => ({
      // static values
      MAX_LANES_LIMIT,
      MIN_CARD_SIZE,
      // user values
      maxLanes: DEFAULT_MAX_LANES,
      cardWidthPercent: DEFAULT_CARD_WIDTH_PERCENT,
      cardHeightPercent: DEFAULT_CARD_HEIGHT_PERCENT,
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
          set({ maxLanes: DEFAULT_MAX_LANES });
        },
        resetCardSizes() {
          set({
            cardWidthPercent: DEFAULT_CARD_WIDTH_PERCENT,
            cardHeightPercent: DEFAULT_CARD_HEIGHT_PERCENT,
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
