import { useResizeObserver } from "@src/hooks/useResizeObserver";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { type ReactNode, useCallback, useDeferredValue, useEffect, useMemo } from "react";

type Props<Item> = {
  items: Item[];
  minLaneWidth: number;
  maxLanes?: number;
  gap?: number;
  overscan: number;
  renderLoader: ReactNode;
  getItemKey: (item: Item) => string;
  estimateSize: (item: Item, width: number) => number;
  renderItem: (item: Item) => ReactNode;
  loadMore: () => void;
};

export default function VirtualMasonry<Item>({
  items,
  minLaneWidth,
  maxLanes,
  gap = 0,
  overscan,
  renderLoader,
  getItemKey,
  estimateSize,
  renderItem,
  loadMore,
}: Props<Item>) {
  const { ref, rect } = useResizeObserver();
  const parentWidth = useDeferredValue(rect.width);

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
    getItemKey: useCallback(
      (i: number) => (parentWidth ? getItemKey(items[i]) : getItemKey(items[i])),
      [getItemKey, items, parentWidth],
    ),
    estimateSize: (i) => estimateSize(items[i], itemWidth),
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
                translate: `0 ${item.start - winVirtualizer.options.scrollMargin}px`,
                left: item.lane * itemWidth + "px",
                width: itemWidth + "px",
                marginLeft: item.lane * gap + "px",
                height: item.size + "px",
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
