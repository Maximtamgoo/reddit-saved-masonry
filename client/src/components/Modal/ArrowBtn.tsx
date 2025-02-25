import ChevronLeft from "@src/svg/chevron-left.svg?react";
import { cn } from "@src/utils/cn";
import style from "./Modal.module.css";

type Props = {
  direction: "left" | "right";
  onClick: () => void;
};

export default function ArrowBtn({ direction, onClick }: Props) {
  return (
    <button
      className={cn(style.modal_btn, style.arrow_btn)}
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
