import { css } from "@acab/ecsstatic";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { lockBodyScroll } from "@src/utils/lockBodyScroll";
import SettingsSvg from "@src/svg/settings.svg?react";
import X from "@src/svg/x.svg?react";
import { cn } from "@src/utils/cn";
import { Profile } from "./Profile";

const popover = css`
  &:popover-open {
    display: grid;
    gap: var(--space-6);
    margin: auto;
    border: 1px solid var(--ring-color);
    border-radius: var(--rounded-lg);
    background-color: var(--bg);
    padding: var(--space-4);
    width: 350px;
    max-width: 96vw;
  }
`;

const backdrop = css`
  position: fixed;
  backdrop-filter: blur(5px);
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

const top = css`
  min-width: 0;
  display: flex;
  align-items: center;
  margin-bottom: calc(-1 * var(--space-2));
`;

const title = css`
  flex-grow: 1;
  font-size: var(--text-2xl);
  & > svg {
    display: inline;
    vertical-align: top;
    margin-right: var(--space-1);
    width: var(--space-9);
    height: var(--space-9);
    stroke-width: 1.5;
  }
`;

const close = css`
  position: relative;
  &::after {
    position: absolute;
    top: var(--space-10);
    border: 2px solid var(--ring-color);
    border-radius: var(--rounded);
    width: var(--space-8);
    pointer-events: none;
    content: "ESC";
    font-weight: 500;
    font-size: var(--text-xs);
  }
`;

export default function SettingsPopover() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onToggle = (e: ToggleEvent) => setIsOpen(e.newState === "open");
    node.addEventListener("toggle", onToggle);
    return () => node.removeEventListener("toggle", onToggle);
  }, []);

  useEffect(() => {
    if (isOpen) return lockBodyScroll();
  }, [isOpen]);

  return (
    <>
      <button popoverTarget={id} popoverTargetAction="toggle" className="btn">
        <SettingsSvg />
      </button>
      <div ref={ref} id={id} popover="auto" className={popover}>
        <div className={top}>
          <span className={cn(title, "truncate")}>
            <SettingsSvg />
            Settings
          </span>
          <button className={cn("btn", close)} onClick={() => ref.current?.hidePopover()}>
            <X />
          </button>
        </div>
        <Theme />
        <MaxColumns />
        <MaxCardSize />
        <Profile />
      </div>
      {isOpen && createPortal(<div className={backdrop}></div>, document.body)}
    </>
  );
}
