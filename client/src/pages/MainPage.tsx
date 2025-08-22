import { useCallback, useMemo, useRef } from "react";
import { useGetSavedContent } from "@src/services/queries";
import { RedditItemMasonry } from "@src/components/RedditItemMasonry";
import Loader from "@src/components/Loader";
import { useSettingsStore } from "@src/store/settings";
const { minCardSize } = useSettingsStore.getInitialState();

export default function MainPage() {
  const isBusyRef = useRef(false);
  const maxLanes = useSettingsStore((s) => s.maxLanes);
  const maxCardWidth = useSettingsStore((s) => s.maxCardWidth);
  const maxCardHeight = useSettingsStore((s) => s.maxCardHeight);
  const query = useGetSavedContent();
  const { data, isLoading, isLoadingError, isError, hasNextPage, fetchNextPage } = query;

  const redditItems = useMemo(() => data?.pages.flatMap((page) => page.redditItems) ?? [], [data]);

  const loadMore = useCallback(async () => {
    if (!isBusyRef.current && hasNextPage && !isError) {
      isBusyRef.current = true;
      await fetchNextPage();
      isBusyRef.current = false;
    }
  }, [hasNextPage, isError, fetchNextPage]);

  if (isLoadingError || isLoading) {
    return (
      <div style={{ height: "calc(100vh - 53px)", alignContent: "center" }}>
        <Loader isError={isLoadingError} onClick={fetchNextPage} />
      </div>
    );
  }

  return (
    <RedditItemMasonry
      items={redditItems}
      gap={20}
      maxLanes={maxLanes}
      minLaneWidth={minCardSize}
      maxLaneWidth={maxCardWidth}
      minCardHeight={minCardSize}
      maxCardHeight={maxCardHeight}
      loadMore={loadMore}
      renderLoader={
        <Loader
          isError={isError}
          isEnd={!hasNextPage}
          endMessage="Reached the Reddit limit..."
          onClick={fetchNextPage}
        />
      }
    />
  );
}
