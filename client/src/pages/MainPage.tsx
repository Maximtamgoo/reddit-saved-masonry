import { useCallback, useMemo, useRef } from "react";
import { useGetSavedContent } from "@src/services/queries";
import { RedditItemMasonry } from "@src/components/RedditItemMasonry";
import { useSettingsStore } from "@src/store/settings";
import Loader from "@src/components/Loader/Loader";

const { minCardSize } = useSettingsStore.getInitialState();

export default function MainPage() {
  const isBusyRef = useRef(false);
  const maxLanes = useSettingsStore((s) => s.maxLanes);
  const maxCardWidth = useSettingsStore((s) => s.maxCardWidth);
  const maxCardHeight = useSettingsStore((s) => s.maxCardHeight);
  const {
    data,
    isLoading,
    isLoadingError,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSavedContent();

  const redditItems = useMemo(() => data?.pages.flatMap((page) => page.redditItems) ?? [], [data]);

  const loadMore = useCallback(async () => {
    if (!isBusyRef.current && hasNextPage && !isError) {
      isBusyRef.current = true;
      await fetchNextPage();
      isBusyRef.current = false;
    }
  }, [hasNextPage, isError, fetchNextPage]);

  if (isLoading) {
    return (
      <main style={{ height: "calc(100vh - 53px)", alignContent: "center" }}>
        <Loader state="loading" />
      </main>
    );
  }

  if (isLoadingError) {
    return (
      <main style={{ height: "calc(100vh - 53px)", alignContent: "center" }}>
        <Loader state="error" onClick={fetchNextPage} />
      </main>
    );
  }

  return (
    <RedditItemMasonry
      items={redditItems}
      gap={25}
      maxLanes={maxLanes}
      minLaneWidth={minCardSize}
      maxLaneWidth={maxCardWidth}
      minCardHeight={minCardSize}
      maxCardHeight={maxCardHeight}
      loadMore={loadMore}
      renderLoader={
        isFetchingNextPage ? (
          <Loader state="loading" />
        ) : isError ? (
          <Loader state="error" onClick={fetchNextPage} />
        ) : !hasNextPage ? (
          <Loader state="end" endMsg="Reached the Reddit limit..." />
        ) : (
          <Loader state="loading" />
        )
      }
    />
  );
}
