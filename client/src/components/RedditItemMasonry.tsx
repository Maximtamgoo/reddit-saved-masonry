import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { RedditItem } from "@src/schema/RedditItem";
import Card from "./Card/Card";
import { calculateAspectRatioFit } from "@src/utils/calculateAspectRatioFit";
import { useResizeObserver } from "@src/hooks/useResizeObserver";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

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

  const itemWidth = useMemo(() => {
    const itemWidth = Math.floor((parentWidth - gap * (lanes - 1)) / lanes);
    return Math.min(itemWidth, maxLaneWidth);
  }, [parentWidth, gap, lanes, maxLaneWidth]);

  const maxWidth = useMemo(() => {
    const gapTotal = gap * (lanes - 1);
    const maxWidth = itemWidth * lanes + gapTotal;
    document.documentElement.style.setProperty("--masonry-max-width", maxWidth + "px");
    return maxWidth;
  }, [gap, itemWidth, lanes]);

  const winVirtualizer = useWindowVirtualizer({
    enabled: parentWidth > 0,
    count: items.length,
    lanes,
    gap,
    overscan: 5,
    getItemKey: useCallback(
      (i: number) => items[i].id,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [items, lanes, itemWidth, maxCardHeight],
    ),
    estimateSize: useCallback(
      (i: number) => {
        const item = items[i];
        const minHeight = minCardHeight;
        const maxHeight = maxCardHeight;
        const detailsHeight = 100;
        let totalHeight = detailsHeight;
        if (item.type === "playable" || item.type === "image" || item.type === "gallery") {
          const p = item.preview;
          totalHeight += calculateAspectRatioFit(p.width, p.height, itemWidth, p.height).height;
        }
        return Math.max(minHeight, Math.min(maxHeight, Math.floor(totalHeight)));
      },
      [items, itemWidth, minCardHeight, maxCardHeight],
    ),
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
          margin: "auto",
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
              style={{
                position: "absolute",
                top: 0,
                translate: `0 ${item.start - winVirtualizer.options.scrollMargin}px`,
                left: item.lane * itemWidth + "px",
                width: itemWidth + "px",
                marginLeft: item.lane * gap + "px",
                height: item.size + "px",
              }}
            >
              <Card item={items[item.index]} />
            </div>
          );
        })}
      </div>
      {winVirtualizer.options.enabled && renderLoader}
    </main>
  );
}
