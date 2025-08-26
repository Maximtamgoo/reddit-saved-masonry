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
    gap: var(--space-7);
    margin: auto;
    border: 1px solid var(--ring-color);
    border-radius: var(--rounded-lg);
    background-color: var(--bg);
    padding: var(--space-4);
    width: 350px;
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
  gap: var(--space-4);
`;

const title = css`
  flex-grow: 1;
  font-size: var(--text-3xl);
  align-content: center;
`;

const close = css`
  display: grid;
  gap: var(--space-1);
  & > span {
    place-self: center;
    border: 2px solid var(--ring-color);
    border-radius: var(--rounded);
    width: var(--space-8);
    font-weight: 500;
    font-size: var(--text-xs);
    user-select: none;
    text-align: center;
  }
`;

export default function SettingsPopover() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const beforeToggle = (e: ToggleEvent) => setIsOpen(e.newState === "open");
    node.addEventListener("beforetoggle", beforeToggle);
    return () => node.removeEventListener("beforetoggle", beforeToggle);
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
          <div className={cn(title, "truncate")}>Settings</div>
          <div className={close}>
            <button className="btn" onClick={() => ref.current?.hidePopover()}>
              <X />
            </button>
            <span>ESC</span>
          </div>
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
