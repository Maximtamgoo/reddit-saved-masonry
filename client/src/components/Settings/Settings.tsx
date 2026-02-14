import { cn } from "@src/utils/cn";
import styles from "./Settings.module.css";
import SettingsSvg from "@src/svg/settings.svg?react";
import XSvg from "@src/svg/x.svg?react";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";
import { useState, type ToggleEvent } from "react";

export default function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  function onToggle(e: ToggleEvent<HTMLDialogElement>) {
    setIsOpen(e.currentTarget.open);
  }

  return (
    <>
      {/* @ts-expect-error commandfor & command should be available */}
      <button commandfor="settings" command="show-modal" className={cn("btn", styles.trigger)}>
        <SettingsSvg />
      </button>
      <dialog id="settings" closedby="any" onToggle={onToggle} className={styles.settings}>
        {isOpen && (
          <>
            <div className={styles.top}>
              <SettingsSvg />
              Settings
              {/* @ts-expect-error commandfor & command should be available */}
              <button commandfor="settings" command="close" className={cn("btn")}>
                <XSvg />
              </button>
            </div>
            <Theme />
            <MaxColumns />
            <MaxCardSize />
            <Profile />
          </>
        )}
      </dialog>
    </>
  );
}
