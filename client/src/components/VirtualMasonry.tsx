import { useResizeObserver } from "@src/hooks/useResizeObserver";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { type ReactNode, useCallback, useEffect, useMemo } from "react";

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
};

export default function VirtualMasonry<Item>({
  items,
  minLaneWidth,
  maxLanes,
  gap,
  overscan,
  renderLoader,
  getItemKey,
  estimateSize,
  renderItem,
  loadMore,
}: Props<Item>) {
  const { ref, rect } = useResizeObserver();
  const parentWidth = rect.width;

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
    scrollMargin: rect.top,
    getItemKey: useCallback(
      (index: number) => getItemKey(items[index]),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [getItemKey, items, parentWidth],
    ),
    estimateSize: (index) => estimateSize(items[index], itemWidth),
  });

  const virtualItems = winVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem && lastItem.index === items.length - 1) loadMore();
  }, [virtualItems, items.length, loadMore]);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: winVirtualizer.getTotalSize(),
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
                left: item.lane * itemWidth,
                width: itemWidth,
                marginLeft: item.lane * gap,
                height: item.size,
              }}
            >
              {renderItem(items[item.index])}
            </div>
          );
        })}
      </div>
      {winVirtualizer.options.enabled && renderLoader}
    </div>
  );
}
