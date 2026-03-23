import { useRef, createContext, useContext, useEffect } from "react";
import type { RefObject, MouseEvent, PropsWithChildren, ComponentProps } from "react";

type Context = {
  dialogRef?: RefObject<HTMLDialogElement | null>;
};

const Context = createContext<Context>({
  dialogRef: undefined,
});

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export function Dialog({ isOpen, onClose, children }: PropsWithChildren<Props>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCloseHandler = () => onClose && onClose();
    dialog.addEventListener("close", onCloseHandler);
    return () => dialog.removeEventListener("close", onCloseHandler);
  }, [onClose]);

  useEffect(() => {
    if (isOpen === undefined) return;
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return <Context value={{ dialogRef }}>{children}</Context>;
}

Dialog.Content = function Content({ children, ...props }: ComponentProps<"dialog">) {
  const { dialogRef } = useContext(Context);

  function onClickBackdrop(e: MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef?.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!isInDialog) dialog.close();
  }

  return (
    <dialog ref={dialogRef} onClick={onClickBackdrop} {...props}>
      {children}
    </dialog>
  );
};

Dialog.Trigger = function Trigger({ children, ...props }: ComponentProps<"button">) {
  const { dialogRef } = useContext(Context);
  return (
    <button onClick={() => dialogRef?.current?.showModal()} {...props}>
      {children}
    </button>
  );
};

Dialog.Close = function Close({ children, ...props }: ComponentProps<"button">) {
  const { dialogRef } = useContext(Context);
  return (
    <button onClick={() => dialogRef?.current?.close()} {...props}>
      {children}
    </button>
  );
};
