import Card from "@src/components/Card/Card";
import Loader from "@src/components/Loader/Loader";
import VirtualMasonry from "@src/components/VirtualMasonry";
import { RedditItem } from "@src/schema/RedditItem";
import { useGetSavedContent } from "@src/services/queries";
import { calculateAspectRatioFit } from "@src/utils/calculateAspectRatioFit";
import { useCallback, useMemo, useRef } from "react";

export default function MainPage() {
  const isBusyRef = useRef(false);
  const query = useGetSavedContent();
  const { data, isLoading, isLoadingError, isError, hasNextPage, fetchNextPage } = query;

  const redditItems = useMemo(() => data?.pages.flatMap((page) => page.redditItems) ?? [], [data]);

  const estimateSize = useCallback((item: RedditItem, width: number) => {
    const minHeight = 350;
    const maxHeight = (window.screen.height / 100) * 75;
    const detailsHeight = 100;
    let totalHeight = detailsHeight;

    if (item.type === "gallery" || item.type === "playable" || item.type === "image") {
      const p = item.preview;
      totalHeight += calculateAspectRatioFit(p.width, p.height, width, p.height).height;
    }

    return Math.max(minHeight, Math.min(maxHeight, Math.round(totalHeight)));
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
      <div className="center">
        <Loader isError={isLoadingError} onClick={fetchNextPage} />
      </div>
    );
  }

  return (
    <VirtualMasonry
      items={redditItems}
      minLaneWidth={350}
      maxLanes={3}
      gap={25}
      overscan={20}
      getItemKey={(item) => item.id}
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
  );
}
