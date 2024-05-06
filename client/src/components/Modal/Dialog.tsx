import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
};

export default function Dialog({ onClose, children }: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";
      document.body.style.paddingRight = scrollbarWidth;
      document.body.style.overflow = "hidden";
      ref.current.showModal();
    }
    return () => {
      document.body.style.paddingRight = "0";
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <dialog
      ref={ref}
      onClick={onClose}
      onClose={onClose}
      className="size-full max-h-full max-w-full bg-transparent"
    >
      {children}
    </dialog>,
    document.body
  );
}
