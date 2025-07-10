import { css } from "@acab/ecsstatic";
import { cn } from "@src/utils/cn";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

type Context = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogRef?: RefObject<HTMLDialogElement | null>;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

const Context = createContext<Context>({
  isOpen: false,
  setIsOpen: () => {},
  dialogRef: undefined,
  triggerRef: undefined,
});

type Props = {
  onOpenEffect?: (dialog: HTMLDialogElement, trigger: HTMLButtonElement) => () => void;
};

export function Dialog({ onOpenEffect, children }: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (isOpen && dialog && trigger && onOpenEffect) {
      const cleanUp = onOpenEffect(dialog, trigger);
      return () => cleanUp();
    }
  }, [isOpen, onOpenEffect]);

  return <Context value={{ dialogRef, triggerRef, isOpen, setIsOpen }}>{children}</Context>;
}

const dialog = css`
  border: none;
  background-color: transparent;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
`;

function disableScrollbar() {
  const paddingRight = document.body.style.paddingRight;
  const overflowY = document.body.style.overflowY;
  const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";
  document.body.style.paddingRight = scrollbarWidth;
  document.body.style.overflowY = "hidden";
  return () => {
    document.body.style.paddingRight = paddingRight;
    document.body.style.overflowY = overflowY;
  };
}

Dialog.Content = function Content({ className, onClick, children }: ComponentProps<"dialog">) {
  const { isOpen, setIsOpen, dialogRef } = useContext(Context);

  useEffect(() => {
    const node = dialogRef?.current;
    if (node && isOpen) {
      const enableScrollbar = disableScrollbar();
      node.showModal();
      return () => enableScrollbar();
    }
  }, [isOpen, dialogRef]);

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={cn(dialog, className ?? "")}
      onClick={onClick}
      onClose={() => setIsOpen(false)}
    >
      {children}
    </dialog>,
    document.body,
  );
};

Dialog.Trigger = function Trigger({ className, children }: ComponentProps<"button">) {
  const context = useContext(Context);
  return (
    <button ref={context.triggerRef} className={className} onClick={() => context.setIsOpen(true)}>
      {children}
    </button>
  );
};

Dialog.Close = function Close({ className, children }: ComponentProps<"button">) {
  const context = useContext(Context);
  return (
    <button className={className} onClick={() => context.setIsOpen(false)}>
      {children}
    </button>
  );
};
