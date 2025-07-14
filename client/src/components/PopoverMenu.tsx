import { lockBodyScroll } from "@src/utils/lockBodyScroll";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

type Context = {
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRef?: RefObject<HTMLButtonElement | null>;
  menuRef?: RefObject<HTMLDivElement | null>;
};

const Context = createContext<Context>({
  id: "",
  isOpen: false,
  setIsOpen: () => {},
  toggleRef: undefined,
  menuRef: undefined,
});

type Props = {
  id: string;
};

export function PopoverMenu({ id, children }: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onToggle(e: Event) {
      setIsOpen((e as ToggleEvent).newState === "open" ? true : false);
    }
    menuRef?.current?.addEventListener("toggle", onToggle);
  }, []);

  useLayoutEffect(() => {
    const toggle = toggleRef.current;
    const menu = menuRef.current;
    if (!toggle || !menu) return;
    if (isOpen) {
      const onResize = () => {
        const toggleRect = toggle.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();
        menu.style.left = toggleRect.right - menuRect.width + "px";
        menu.style.top = toggleRect.bottom + 10 + "px";
      };
      window.addEventListener("resize", onResize);
      onResize();
      const unlock = lockBodyScroll();
      return () => {
        window.removeEventListener("resize", onResize);
        unlock();
      };
    }
  }, [isOpen]);

  return <Context value={{ id, toggleRef, menuRef, isOpen, setIsOpen }}>{children}</Context>;
}

PopoverMenu.Toggle = function Trigger({ className, children }: ComponentProps<"button">) {
  const c = useContext(Context);

  return (
    <button
      ref={c.toggleRef}
      popoverTarget={c.id}
      popoverTargetAction="toggle"
      className={className}
    >
      {children}
    </button>
  );
};

PopoverMenu.Backdrop = function Backdrop({ className, children }: ComponentProps<"div">) {
  const c = useContext(Context);
  if (!c.isOpen) return null;
  return createPortal(<div className={className}>{children}</div>, document.body);
};

PopoverMenu.Content = function Content({ className, children }: ComponentProps<"div">) {
  const c = useContext(Context);
  return (
    <div ref={c.menuRef} id={c.id} popover="auto" className={className}>
      {children}
    </div>
  );
};
