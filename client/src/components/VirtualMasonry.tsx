import { useResizeObserver } from "@src/hooks/useResizeObserver";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { type ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

type Props<Item> = {
  items: Item[];
  minLaneWidth: number;
  maxLanes?: number;
  gap: number;
  overscan: number;
  renderLoader: ReactNode;
  getItemKey: (item: Item) => string | number;
  estimateSize: (item: Item, width: number) => number;
  renderItem: (item: Item) => ReactNode;
  loadMore: () => void;
  hasMore: boolean;
};

export default function VirtualMasonry<Item>({
  items,
  minLaneWidth,
  maxLanes,
  gap,
  overscan,
  renderLoader,
  hasMore,
  getItemKey,
  estimateSize,
  renderItem,
  loadMore,
}: Props<Item>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const parentRect = useResizeObserver(parentRef);
  const parentWidth = parentRect.width;

  const lanes = useMemo(() => {
    const lanes = Math.floor((parentWidth + gap) / (minLaneWidth + gap));
    return Math.max(1, Math.min(lanes, maxLanes ?? Infinity));
  }, [parentWidth, gap, minLaneWidth, maxLanes]);

  const itemWidth = useMemo(
    () => Math.floor((parentWidth - gap * (lanes - 1)) / lanes),
    [parentWidth, gap, lanes],
  );

  const winVirtualizer = useWindowVirtualizer({
    enabled: parentWidth > 0,
    count: items.length,
    lanes,
    gap,
    overscan,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
    getItemKey: useCallback(
      (index: number) => getItemKey(items[index]),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [getItemKey, parentWidth],
    ),
    estimateSize: (index) => estimateSize(items[index], itemWidth),
  });

  const virtualItems = winVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem && lastItem.index === items.length - 1) loadMore();
  }, [virtualItems, items.length, loadMore]);

  return (
    <div
      ref={parentRef}
      style={{
        maxWidth: "100%",
      }}
    >
      {winVirtualizer.options.enabled && (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: `${winVirtualizer.getTotalSize()}px`,
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
                    transform: `translateY(${item.start - winVirtualizer.options.scrollMargin}px)`,
                    left: `${item.lane * itemWidth}px`,
                    width: `${itemWidth}px`,
                    marginLeft: `${item.lane * gap}px`,
                    height: `${item.size}px`,
                  }}
                >
                  {renderItem(items[item.index])}
                </div>
              );
            })}
          </div>
          {hasMore && renderLoader}
        </>
      )}
    </div>
  );
}
