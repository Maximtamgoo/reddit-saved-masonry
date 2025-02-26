import Card from "@src/components/Card/Card";
import VirtualMasonry from "@src/components/VirtualMasonry";
import { RedditItem } from "@src/schema/RedditItem";
import { useGetSavedContent } from "@src/services/queries";
import LoaderCircle from "@src/svg/loader-circle.svg?react";
import RotateCw from "@src/svg/rotate-cw.svg?react";
import { calculateAspectRatioFit } from "@src/utils/calculateAspectRatioFit";
import { useCallback, useMemo, useRef } from "react";
import style from "./MainPage.module.css";

export default function MainPage() {
  const isBusyRef = useRef(false);
  const { data, isLoading, isLoadingError, isError, hasNextPage, fetchNextPage } =
    useGetSavedContent();

  const redditItems = useMemo(() => data?.pages.flatMap((page) => page.redditItems) ?? [], [data]);

  const estimateSize = useCallback((item: RedditItem, width: number) => {
    const minHeight = 350;
    const maxHeight = window.screen.height;
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
      <div className={style.center}>
        <Loader isError={isLoadingError} onClick={fetchNextPage} />
      </div>
    );
  }

  return (
    <>
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
        renderLoader={<Loader isError={isError} onClick={fetchNextPage} />}
        hasMore={hasNextPage}
      />
      {!hasNextPage && <div className={style.loader}>Reached the Reddit limit...</div>}
    </>
  );
}

function Loader({ isError = false, onClick }: { isError?: boolean; onClick?: () => void }) {
  return (
    <div className={style.loader}>
      {isError ? "Could not get posts" : "Getting Posts"}
      {isError ? (
        <button className={style.retry} onClick={onClick}>
          <RotateCw />
        </button>
      ) : (
        <LoaderCircle className={style.spin} width={40} height={40} />
      )}
    </div>
  );
}
