import { ListingItem } from "@src/schema/Listing";
import { RedditItem } from "@src/schema/RedditItem";
import { transformRedditItem } from "@src/utils/transformRedditItem";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reddit from "./reddit";
import * as auth from "./auth";

export const queryKeys = {
  all: () => ["all"] as const,
  session: () => [...queryKeys.all(), "session"] as const,
  savedContent: () => [...queryKeys.all(), "savedContent"] as const,
};

export const mutationKeys = {
  bookmark: (id: string) => ["bookmark", id] as const,
  signOut: () => ["signOut"] as const,
};

export function useSession() {
  return useQuery({
    queryKey: queryKeys.session(),
    queryFn: async () => {
      const session = await auth.getSession();
      history.replaceState(null, "", "/");
      return session;
    },
  });
}

const redditItemMap = new Map<string, { pageParamIndex: number; itemIndex: number }>();

type SavedContent = ReturnType<typeof useGetSavedContent>["data"];

export function useGetSavedContent() {
  return useInfiniteQuery({
    queryKey: queryKeys.savedContent(),
    initialPageParam: "",
    networkMode: "always",
    queryFn: async ({ pageParam, client, queryKey }) => {
      const oldData = client.getQueryData<SavedContent>(queryKey);
      const pageParamIndex = oldData ? oldData.pageParams.length : 0;

      const listing = await reddit.getSavedContent(pageParam);
      const redditItems: RedditItem[] = [];
      for (let i = 0; i < listing.data.children.length; i++) {
        const item = listing.data.children[i];
        const listingItemResult = ListingItem.try(item, { mode: "strip" });
        if (!listingItemResult.ok) {
          console.log("Failed to parse ListingItem:", listingItemResult.message);
          console.log("Failed ListingItem:", item);
          continue;
        }

        const result = RedditItem.try(transformRedditItem(listingItemResult.value));
        if (!result.ok) {
          console.log("Failed to parse reddit item:", result.message);
          console.log("Failed reddit item:", listingItemResult.value);
          continue;
        }
        if (result.value.type === "unknown") console.log("unknown item:", item);
        redditItems.push(result.value);
        redditItemMap.set(result.value.id, { pageParamIndex, itemIndex: i });
      }

      return {
        after: listing.data.after,
        before: listing.data.before,
        redditItems,
      };
    },
    getNextPageParam: (lastPage) => lastPage.after,
  });
}

export function useToggleBookmark(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.bookmark(id),
    mutationFn: (saved: boolean) => reddit.toggleBookmark(id, saved),
    onSuccess: (_, saved) => {
      qc.setQueryData<SavedContent>(queryKeys.savedContent(), (oldData) => {
        if (oldData) {
          const indexMap = redditItemMap.get(id);
          if (indexMap) {
            const page = oldData.pages[indexMap.pageParamIndex];
            page.redditItems[indexMap.itemIndex].saved = saved;
            return oldData;
          }
        }
      });
    },
  });
}

export function useSignOut() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.signOut(),
    mutationFn: auth.signOut,
    onSuccess: () => {
      qc.resetQueries({ queryKey: queryKeys.all(), type: "all" });
      document.documentElement.style.setProperty("--masonry-max-width", "405px");
    },
  });
}
