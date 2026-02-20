import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { RedditItem } from "@src/schema/RedditItem";
import Card from "./Card/Card";
import { calculateAspectRatioFit } from "@src/utils/calculateAspectRatioFit";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useResizeObserver } from "@src/hooks/useResizeObserver";

type Props = {
  items: RedditItem[];
  gap?: number;
  maxLanes?: number;
  minLaneWidth: number;
  maxLaneWidth: number;
  minCardHeight: number;
  maxCardHeight: number;
  loadMore: () => void;
  renderLoader: ReactNode;
};

export function RedditItemMasonry({
  items,
  gap = 0,
  maxLanes,
  minLaneWidth,
  maxLaneWidth,
  minCardHeight,
  maxCardHeight,
  loadMore,
  renderLoader,
}: Props) {
  const { ref, rect } = useResizeObserver();
  const parentWidth = rect.width;

  const lanes = useMemo(() => {
    const lanes = Math.floor((parentWidth + gap) / (minLaneWidth + gap));
    return Math.max(1, Math.min(lanes, maxLanes ?? Infinity));
  }, [parentWidth, gap, minLaneWidth, maxLanes]);

  const gapTotal = useMemo(() => gap * (lanes - 1), [gap, lanes]);

  const itemWidth = useMemo(() => {
    const itemWidth = Math.floor((parentWidth - gapTotal) / lanes);
    return Math.min(itemWidth, maxLaneWidth);
  }, [parentWidth, gapTotal, lanes, maxLaneWidth]);

  const maxWidth = useMemo(() => {
    const maxWidth = itemWidth * lanes + gapTotal;
    document.documentElement.style.setProperty("--masonry-max-width", maxWidth + "px");
    return maxWidth;
  }, [itemWidth, lanes, gapTotal]);

  const getItemKey = useCallback(
    (i: number) => {
      if (i === 0) console.log("getItemKey 0");
      return items[i].id;
    },
    [items],
  );

  const estimateSize = useCallback(
    (i: number) => {
      if (i === 0) console.log("estimateSize 0");
      const item = items[i];
      const detailsHeight = 100;
      let totalHeight = detailsHeight;
      if (item.type === "playable" || item.type === "image" || item.type === "gallery") {
        const p = item.preview;
        totalHeight += calculateAspectRatioFit(p.width, p.height, itemWidth, p.height).height;
      }
      return Math.max(minCardHeight, Math.min(maxCardHeight, Math.floor(totalHeight)));
    },
    [items, itemWidth, minCardHeight, maxCardHeight],
  );

  const winVirtualizer = useWindowVirtualizer({
    enabled: parentWidth > 0,
    count: items.length,
    lanes,
    gap,
    overscan: 5,
    getItemKey,
    estimateSize,
  });

  const virtualItems = winVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem && lastItem.index === items.length - 1) loadMore();
  }, [virtualItems, items.length, loadMore]);

  return (
    <main ref={ref} style={{ maxWidth: "100%", padding: "var(--space-2)" }}>
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          maxWidth: maxWidth + "px",
          width: "100%",
          height: winVirtualizer.getTotalSize() + "px",
        }}
      >
        {virtualItems.map((item) => {
          return (
            <div
              key={item.key}
              data-index={item.index}
              ref={winVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                translate: `0 ${item.start - winVirtualizer.options.scrollMargin}px`,
                left: item.lane * itemWidth + "px",
                width: itemWidth + "px",
                marginLeft: item.lane * gap + "px",
              }}
            >
              <Card item={items[item.index]} itemWidth={itemWidth} />
            </div>
          );
        })}
      </div>
      {winVirtualizer.options.enabled && renderLoader}
    </main>
  );
}
