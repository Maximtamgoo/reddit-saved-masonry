import { ListingItem } from "@src/schema/Listing";
import { RedditItem } from "@src/schema/RedditItem";
import { transformRedditItem } from "@src/utils/transformRedditItem";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";

export const queryKeys = {
  all: () => ["all"] as const,
  user: () => [...queryKeys.all(), "user"] as const,
  savedContent: (name: string) => [...queryKeys.all(), "savedContent", name] as const,
  bookmark: (id: string) => ["bookmark", id] as const,
  signOut: () => ["signOut"] as const,
};

export function useGetSignedInUser() {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: async () => {
      const urlParams = new URLSearchParams(location.search);
      if (location.pathname === "/auth_callback") history.replaceState(null, "", "/");
      const urlError = urlParams.get("error");
      if (urlError) throw Error(urlError);
      const urlCode = urlParams.get("code");
      if (urlCode) await api.authorize(urlCode);
      return await api.getMe();
    },
  });
}

type User = ReturnType<typeof useGetSignedInUser>["data"];

function useGetUsername() {
  const qc = useQueryClient();
  return qc.getQueryData<User>(queryKeys.user())?.name;
}

type SavedContent = ReturnType<typeof useGetSavedContent>["data"];

export function useGetSavedContent() {
  const username = useGetUsername() ?? "";
  return useInfiniteQuery({
    queryKey: queryKeys.savedContent(username),
    enabled: !!username,
    initialPageParam: "",
    queryFn: async ({ pageParam }) => {
      const listing = await api.getSavedContent(username, pageParam);
      const redditItems: RedditItem[] = [];
      for (const item of listing.data.children) {
        const listingItemResult = ListingItem.try(item, { mode: "strip" });
        if (!listingItemResult.ok) {
          console.log("Failed to parse ListingItem:", listingItemResult.message);
          console.log("Failed ListingItem:", item);
          continue;
        }

        const result = RedditItem.try(transformRedditItem(listingItemResult.value, pageParam));
        if (!result.ok) {
          console.log("Failed to parse reddit item:", result.message);
          console.log("Failed reddit item:", listingItemResult.value);
          continue;
        }
        if (result.value.type === "unknown") console.log("unknown item:", item);
        redditItems.push(result.value);
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

export function useToggleBookmark(id: string, pageParam: string) {
  const qc = useQueryClient();
  const username = useGetUsername() ?? "";
  return useMutation({
    mutationKey: queryKeys.bookmark(id),
    mutationFn: ({ saved }: { saved: boolean }) => api.toggleBookmark(id, saved),
    onSuccess: (_, { saved }) => {
      qc.setQueryData<SavedContent>(queryKeys.savedContent(username), (oldData) => {
        if (oldData) {
          let found = false;
          const newPages = [];
          for (let i = 0; i < oldData.pages.length; i++) {
            const page = oldData.pages[i];
            if (!found) {
              if (oldData.pageParams[i] === pageParam) {
                const postIndex = page.redditItems.findIndex((post) => post.id === id);
                if (postIndex !== -1) {
                  page.redditItems[postIndex].saved = saved;
                  found = true;
                }
              }
            }
            newPages.push(page);
          }

          return {
            pages: newPages,
            pageParams: oldData.pageParams,
          };
        }
      });
    },
  });
}

export function useSignOut() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: queryKeys.signOut(),
    mutationFn: api.signOut,
    onSuccess: () => qc.resetQueries({ queryKey: queryKeys.all(), type: "all" }),
  });
}
