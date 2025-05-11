import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

type Context = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = createContext<Context | null>(null);

export default function Dialog({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  return <Context value={{ isOpen, setIsOpen }}>{children}</Context>;
}

function openModal(node: HTMLDialogElement) {
  const paddingRight = document.body.style.paddingRight;
  const overflowY = document.body.style.overflowY;
  const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";
  document.body.style.paddingRight = scrollbarWidth;
  document.body.style.overflowY = "hidden";
  node.showModal();
  node.focus();
  return () => {
    document.body.style.paddingRight = paddingRight;
    document.body.style.overflowY = overflowY;
  };
}

Dialog.Content = function Content({ children }: PropsWithChildren) {
  const context = useContext(Context);
  if (!context) throw "Missing Dialog.Content Context";

  if (!context.isOpen) return null;

  const onClose = () => context.setIsOpen(false);

  return createPortal(
    <dialog ref={openModal} onClick={onClose} onClose={onClose}>
      {children}
    </dialog>,
    document.body,
  );
};

Dialog.Trigger = function Trigger({ className, children }: ComponentProps<"button">) {
  const context = useContext(Context);
  if (!context) throw "Missing Dialog.Trigger Context";
  return (
    <button className={className} onClick={() => context.setIsOpen(true)}>
      {children}
    </button>
  );
};

Dialog.Close = function Close({ className, children }: ComponentProps<"button">) {
  const context = useContext(Context);
  if (!context) throw "Missing Dialog.Close Context";
  return (
    <button className={className} onClick={() => context.setIsOpen(false)}>
      {children}
    </button>
  );
};
