import { useCallback, useState } from "react";

type Rect = Omit<DOMRectReadOnly, "toJSON">;

const defaultState: Rect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export function useResizeObserver() {
  const [rect, setRect] = useState(defaultState);

  const ref = useCallback((node: Element | null) => {
    const observer = new ResizeObserver(([entry]) => setRect(entry.contentRect));
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, rect };
}
