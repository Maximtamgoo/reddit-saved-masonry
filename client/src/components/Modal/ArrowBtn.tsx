import ChevronLeft from "@src/svg/chevron-left.svg?react";
import type { ComponentProps } from "react";

type Props = {
  direction: "left" | "right";
  onClick: () => void;
};

export default function ArrowBtn({
  className,
  direction,
  onClick,
}: ComponentProps<"button"> & Props) {
  return (
    <button
      className={className}
      data-arrow={direction}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <ChevronLeft />
    </button>
  );
}
