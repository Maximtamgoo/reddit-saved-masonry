import { cn } from "@src/utils/cn";
import styles from "./SettingsPopover.module.css";
import SettingsSvg from "@src/svg/settings.svg?react";
import XSvg from "@src/svg/x.svg?react";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";

export default function SettingsDialog() {
  return (
    <>
      {/* @ts-expect-error commandfor & command should be available */}
      <button commandfor="settings" command="show-modal" className={cn("btn", styles.trigger)}>
        Dia
      </button>
      <dialog id="settings" closedby="any" className={styles.settings}>
        <SettingsSvg />
        Settings
        {/* @ts-expect-error commandfor & command should be available */}
        <button commandfor="settings" command="close" className={cn("btn")}>
          <XSvg />
        </button>
        <Theme />
        <MaxColumns />
        <MaxCardSize />
        <Profile />
      </dialog>
    </>
  );
}
