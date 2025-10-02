import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SettingsPopover.module.css";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { bodyScroll } from "@src/utils/toggleBodyScroll";
import SettingsSvg from "@src/svg/settings.svg?react";
import X from "@src/svg/x.svg?react";
import { cn } from "@src/utils/cn";
import { Profile } from "./Profile";

export default function SettingsPopover() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onBeforeToggle = (e: ToggleEvent) =>
      e.newState === "open" ? bodyScroll.lock() : bodyScroll.unlock();
    const onToggle = (e: ToggleEvent) => setIsOpen(e.newState === "open");
    node.addEventListener("beforetoggle", onBeforeToggle);
    node.addEventListener("toggle", onToggle);
    return () => {
      node.removeEventListener("beforetoggle", onBeforeToggle);
      node.removeEventListener("toggle", onToggle);
    };
  }, []);

  return (
    <>
      <button popoverTarget={id} popoverTargetAction="toggle" className="btn">
        <SettingsSvg />
      </button>
      <div ref={ref} id={id} popover="auto" className={styles.popover}>
        <div className={styles.top}>
          <span className={cn(styles.title, "truncate")}>
            <SettingsSvg />
            Settings
          </span>
          <button className={cn("btn", styles.close)} onClick={() => ref.current?.hidePopover()}>
            <X />
          </button>
        </div>
        <Theme />
        <MaxColumns />
        <MaxCardSize />
        <Profile />
      </div>
      {isOpen && createPortal(<div className={styles.backdrop}></div>, document.body)}
    </>
  );
}
