import ArrowLeft from "@src/svg/arrow-left.svg?react";
import { cn } from "@src/utils/cn";
import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";

type Props = {
  onClose: () => void;
};

export default function Dialog({ onClose, children }: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      const paddingRight = document.body.style.paddingRight;
      const overflowY = document.body.style.overflowY;
      const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";
      document.body.style.paddingRight = scrollbarWidth;
      document.body.style.overflowY = "hidden";
      ref.current.showModal();
      ref.current.focus();
      return () => {
        document.body.style.paddingRight = paddingRight;
        document.body.style.overflowY = overflowY;
      };
    }
  }, []);

  return createPortal(
    <dialog ref={ref} onClick={onClose} onClose={onClose} className={style.dialog}>
      {children}
      <button className={cn(style.modal_btn, style.close)} onClick={onClose}>
        <ArrowLeft />
      </button>
    </dialog>,
    document.body,
  );
}
