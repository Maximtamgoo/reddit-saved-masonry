import type { GalleryItem, RedditItem } from "@src/schema/RedditItem";
import { create } from "zustand";

interface State {
  isOpen: boolean;
  redditItem?: RedditItem;
  index: number;
  galleryItems: GalleryItem[];
  actions: {
    open: (redditItem: RedditItem) => void;
    close: () => void;
    prevIndex: () => void;
    nextIndex: () => void;
  };
}

export const useGalleryStore = create<State>()((set, get) => ({
  isOpen: false,
  redditItem: undefined,
  index: 0,
  galleryItems: [],
  actions: {
    open(item) {
      const isGallery = item.type === "gallery";
      const isPlayable = item.type === "playable";
      const isImage = item.type === "image";
      const galleryItems = isGallery ? item.gallery : isImage || isPlayable ? [item] : [];
      set({ isOpen: true, redditItem: item, index: 0, galleryItems });
    },
    close() {
      set({ isOpen: false, redditItem: undefined, index: 0, galleryItems: [] });
    },
    prevIndex() {
      const i = get().index;
      set({ index: i === 0 ? i : i - 1 });
    },
    nextIndex() {
      const i = get().index;
      const len = get().galleryItems.length;
      set({ index: i === len - 1 ? i : i + 1 });
    },
  },
}));
