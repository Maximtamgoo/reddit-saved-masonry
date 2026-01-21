import styles from "./SettingsPopover.module.css";
import SettingsSvg from "@src/svg/settings.svg?react";
import XSvg from "@src/svg/x.svg?react";
import { cn } from "@src/utils/cn";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";

export default function SettingsPopover() {
  return (
    <>
      <button popoverTarget="settings" className={cn("btn", styles.trigger)}>
        <SettingsSvg />
      </button>
      <div id="settings" popover="auto" className={styles.settings}>
        <div className={styles.top}>
          <SettingsSvg />
          Settings
          <button popoverTarget="settings" popoverTargetAction="hide" className={cn("btn")}>
            <XSvg />
          </button>
        </div>
        <Theme />
        <MaxColumns />
        <MaxCardSize />
        <Profile />
      </div>
    </>
  );
}
