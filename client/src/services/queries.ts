import { QueryClient, useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { RedditItem } from "@src/schema/RedditItem";
import { transformToRedditItem } from "@src/utils/transformToRedditItem";
import { getMe, getSavedContent, toggleBookmark } from "./reddit";
import { signOut } from "./auth";

export const qc = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
    mutations: { retry: false },
  },
});

export const queryKeys = {
  user: () => ["user"] as const,
  savedContent: () => ["savedContent"] as const,
};

export const mutationKeys = {
  tryToken: () => ["tryToken"] as const,
  bookmark: (id: string) => ["bookmark", id] as const,
  signOut: () => ["signOut"] as const,
};

history.replaceState(null, "", "/");

export function useUser() {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: getMe,
  });
}

export function useTryToken() {
  return useMutation({
    mutationKey: mutationKeys.tryToken(),
    mutationFn: (token: string) => {
      localStorage.setItem("token", token);
      return getMe();
    },
    onError() {
      localStorage.removeItem("token");
    },
    onSuccess: (me) => {
      qc.setQueryData<ReturnType<typeof useUser>["data"]>(queryKeys.user(), () => me);
    },
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
        try {
          const redditItem = transformToRedditItem(item);
          if (redditItem.type === "unknown") console.log("unknown item:", item);
          redditItems.push(redditItem);
          redditItemMap.set(redditItem.id, { pageParamIndex, itemIndex: i });
        } catch (error) {
          console.log(error);
          if (error instanceof Error) {
            console.log("Cause:", error.cause);
          }
        }
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
    mutationFn: () => {
      localStorage.removeItem("token");
      return signOut();
    },
    onSettled: () => {
      window.location.reload();
    },
  });
}
