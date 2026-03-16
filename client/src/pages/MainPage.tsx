import { useCallback, useMemo, useRef } from "react";
import { useGetSavedContent } from "@src/services/queries";
import { RedditItemMasonry } from "@src/components/RedditItemMasonry";
import { useSettingsStore } from "@src/store/settings";
import Loader from "@src/components/Loader/Loader";

const { MIN_CARD_SIZE } = useSettingsStore.getInitialState();

export default function MainPage() {
  const isBusyRef = useRef(false);
  const maxLanes = useSettingsStore((s) => s.maxLanes);
  const cardWidthPercent = useSettingsStore((s) => s.cardWidthPercent);
  const cardHeightPercent = useSettingsStore((s) => s.cardHeightPercent);
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

  const cardWidthPixels = Math.floor((window.screen.availWidth / 100) * cardWidthPercent);
  const cardHeightPixels = Math.floor((window.screen.availHeight / 100) * cardHeightPercent);

  return (
    <RedditItemMasonry
      items={redditItems}
      gap={25}
      maxLanes={maxLanes}
      minLaneWidth={MIN_CARD_SIZE}
      maxLaneWidth={cardWidthPixels}
      minCardHeight={MIN_CARD_SIZE}
      maxCardHeight={cardHeightPixels}
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
