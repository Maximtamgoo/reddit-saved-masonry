import ChevronLeft from "@src/svg/chevron-left.svg?react";
import type { ComponentProps } from "react";

type Props = {
  direction: "left" | "right";
};

export default function ArrowBtn({ direction, ...props }: ComponentProps<"button"> & Props) {
  return (
    <button data-direction={direction} {...props}>
      <ChevronLeft />
    </button>
  );
}
