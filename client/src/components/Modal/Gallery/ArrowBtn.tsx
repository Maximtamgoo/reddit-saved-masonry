import ChevronLeft from "@src/svg/chevron-left.svg?react";
import style from "./Gallery.module.css";

type Props = {
  direction: "left" | "right";
  onClick: () => void;
};

export default function ArrowBtn({ direction, onClick }: Props) {
  return (
    <button
      className={style.arrow_btn}
      data-arrow={direction}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronLeft className="rotate-180" />}
    </button>
  );
}
