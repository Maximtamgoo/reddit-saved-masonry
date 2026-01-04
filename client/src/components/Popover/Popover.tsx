import { bodyScroll } from "@src/utils/toggleBodyScroll";
import {
  useCallback,
  useContext,
  useId,
  useState,
  type ComponentProps,
  type PropsWithChildren,
} from "react";
// import { createPortal } from "react-dom";
import { Context } from "./Context";

export function Popover({ children }: PropsWithChildren) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  return <Context value={{ id, isOpen, setIsOpen }}>{children}</Context>;
}

Popover.Content = function Content({ className, children }: ComponentProps<"div">) {
  const { id, setIsOpen } = useContext(Context);

  const ref = useCallback(
    (node: HTMLDivElement) => {
      const onToggle = (e: ToggleEvent) => {
        setIsOpen(e.newState === "open");
        bodyScroll.toggle();
      };
      node.addEventListener("toggle", onToggle);
      return () => {
        node.removeEventListener("toggle", onToggle);
      };
    },
    [setIsOpen],
  );

  return (
    <div ref={ref} id={id} popover="auto" className={className}>
      {children}
    </div>
  );
};

Popover.Trigger = function Trigger({ className, children }: ComponentProps<"button">) {
  const { id } = useContext(Context);
  return (
    <button popoverTarget={id} popoverTargetAction="toggle" className={className}>
      {children}
    </button>
  );
};

Popover.Close = function Close({ className, children }: ComponentProps<"button">) {
  const { id } = useContext(Context);

  return (
    <button popoverTarget={id} popoverTargetAction="hide" className={className}>
      {children}
    </button>
  );
};

// Popover.Backdrop = function Backdrop({ className }: ComponentProps<"div">) {
//   const { isOpen } = useContext(Context);
//   return isOpen ? createPortal(<div className={className}></div>, document.body) : null;
// };

// Popover.Divider = function Divider({ style, className }: ComponentProps<"div">) {
//   return <div style={style} className={className}></div>;
// };
