import { QueryClient, useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { ListingItem } from "@src/schema/Listing";
import { RedditItem } from "@src/schema/RedditItem";
import { transformRedditItem } from "@src/utils/transformRedditItem";
import { signOut } from "./api";
import { getMe, getSavedContent, toggleBookmark } from "./reddit";

export const qc = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: Infinity, refetchOnWindowFocus: false },
    mutations: { retry: 1 },
  },
});

export const queryKeys = {
  user: () => ["user"] as const,
  savedContent: () => ["savedContent"] as const,
};

export const mutationKeys = {
  bookmark: (id: string) => ["bookmark", id] as const,
  signOut: () => ["signOut"] as const,
};

history.replaceState(null, "", "/");

export function useUser() {
  return useQuery({
    queryKey: queryKeys.user(),
    retry: false,
    queryFn: getMe,
  });
}

const redditItemMap = new Map<string, { pageParamIndex: number; itemIndex: number }>();

type SavedContent = ReturnType<typeof useGetSavedContent>["data"];

export function useGetSavedContent() {
  const username = useUser().data?.name ?? "";
  return useInfiniteQuery({
    queryKey: queryKeys.savedContent(),
    initialPageParam: "",
    networkMode: "always",
    queryFn: async ({ pageParam, client, queryKey }) => {
      const oldData = client.getQueryData<SavedContent>(queryKey);
      const pageParamIndex = oldData ? oldData.pageParams.length : 0;

      const listing = await getSavedContent(username, pageParam);
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
  return useMutation({
    mutationKey: mutationKeys.bookmark(id),
    mutationFn: (saved: boolean) => toggleBookmark(id, saved),
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
  return useMutation({
    mutationKey: mutationKeys.signOut(),
    mutationFn: signOut,
    onSettled: () => {
      window.location.reload();
    },
  });
}
