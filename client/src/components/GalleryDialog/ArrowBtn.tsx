import ChevronLeft from "@src/svg/chevron-left.svg?react";
import type { ComponentProps } from "react";

type Props = {
  disabled?: boolean;
  direction: "left" | "right";
  onClick: () => void;
};

export default function ArrowBtn({
  className,
  disabled = false,
  direction,
  onClick,
}: ComponentProps<"button"> & Props) {
  return (
    <button className={className} disabled={disabled} data-direction={direction} onClick={onClick}>
      <ChevronLeft />
    </button>
  );
}
