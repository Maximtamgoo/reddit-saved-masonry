import Card from "@src/components/Card/Card";
import Loader from "@src/components/Loader";
import VirtualMasonry from "@src/components/VirtualMasonry";
import { useResizeObserver } from "@src/hooks/useResizeObserver";
import { RedditItem } from "@src/schema/RedditItem";
import { useGetSavedContent } from "@src/services/queries";
import { calculateAspectRatioFit } from "@src/utils/calculateAspectRatioFit";
import { useCallback, useMemo, useRef } from "react";

export default function MainPage() {
  const isBusyRef = useRef(false);
  const { ref, rect } = useResizeObserver();
  const query = useGetSavedContent();
  const { data, isLoading, isLoadingError, isError, hasNextPage, fetchNextPage } = query;

  const redditItems = useMemo(() => data?.pages.flatMap((page) => page.redditItems) ?? [], [data]);

  const gap = useMemo(() => (rect.width < 1175 ? 16 : 24), [rect.width]);

  const getItemKey = useCallback((item: RedditItem) => item.id, []);

  const estimateSize = useCallback((item: RedditItem, width: number) => {
    const minHeight = 300;
    const maxHeight = (window.screen.availHeight / 100) * 75;
    const detailsHeight = 100;
    let totalHeight = detailsHeight;

    if (item.type === "playable" || item.type === "image" || item.type === "gallery") {
      const p = item.preview;
      totalHeight += calculateAspectRatioFit(p.width, p.height, width, p.height).height;
    }

    return Math.max(minHeight, Math.min(maxHeight, Math.floor(totalHeight)));
  }, []);

  const loadMore = useCallback(async () => {
    if (!isBusyRef.current && hasNextPage && !isError) {
      isBusyRef.current = true;
      await fetchNextPage();
      isBusyRef.current = false;
    }
  }, [hasNextPage, isError, fetchNextPage]);

  if (isLoadingError || isLoading) {
    return (
      <main style={{ height: "45vh", alignContent: "end" }}>
        <Loader isError={isLoadingError} onClick={fetchNextPage} />
      </main>
    );
  }

  return (
    <main ref={ref}>
      <VirtualMasonry
        items={redditItems}
        minLaneWidth={300}
        maxLanes={3}
        gap={gap}
        overscan={20}
        getItemKey={getItemKey}
        estimateSize={estimateSize}
        loadMore={loadMore}
        renderItem={(item) => <Card item={item} />}
        renderLoader={
          <Loader
            isError={isError}
            isEnd={!hasNextPage}
            endMessage="Reached the Reddit limit..."
            onClick={fetchNextPage}
          />
        }
      />
    </main>
  );
}
