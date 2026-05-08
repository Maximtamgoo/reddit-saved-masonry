import { useCallback, useRef, useState } from "react";

type Rect = Omit<DOMRectReadOnly, "toJSON">;

const defaultRect: Rect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

type RefCallback = (node: Element | null) => () => void;

export function useResizeObserver(): { ref: RefCallback; value: Rect };
export function useResizeObserver(property: keyof Rect): { ref: RefCallback; value: number };
export function useResizeObserver(property?: keyof Rect) {
  const [value, setValue] = useState<Rect | number>(property ? 0 : defaultRect);
  const prevValueRef = useRef<Rect | number>(property ? 0 : defaultRect);

  const ref = useCallback(
    (node: Element | null) => {
      const observer = new ResizeObserver(([entry]) => {
        if (property) {
          const newValue = entry.contentRect[property];
          if (newValue !== prevValueRef.current) {
            prevValueRef.current = newValue;
            setValue(newValue);
          }
        } else {
          setValue(entry.contentRect);
        }
      });
      if (node) observer.observe(node);
      return () => observer.disconnect();
    },
    [property],
  );

  return { ref, value };
}
