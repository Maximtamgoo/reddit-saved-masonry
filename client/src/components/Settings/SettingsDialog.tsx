import styles from "./SettingsDialog.module.css";
import SettingsSvg from "@src/svg/settings.svg?react";
import XSvg from "@src/svg/x.svg?react";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";

export function SettingsDialog() {
  return (
    <>
      {/* @ts-expect-error commandfor & command should be available */}
      <button commandfor="settings" command="show-modal" className="btn">
        <SettingsSvg />
      </button>
      <dialog id="settings" closedby="any" className={styles.settings}>
        <div className={styles.top}>
          <SettingsSvg />
          Settings
          {/* @ts-expect-error commandfor & command should be available */}
          <button commandfor="settings" command="close" className="btn">
            <XSvg />
          </button>
        </div>
        <Theme />
        <MaxColumns />
        <MaxCardSize />
        <Profile />
      </dialog>
    </>
  );
}
