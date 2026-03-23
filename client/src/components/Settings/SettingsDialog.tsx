import styles from "./SettingsDialog.module.css";
import { Dialog } from "../Dialog";
import SettingsSvg from "@src/svg/settings.svg?react";
import XSvg from "@src/svg/x.svg?react";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";

export function SettingsDialog() {
  return (
    <Dialog>
      <Dialog.Trigger className="btn">
        <SettingsSvg />
      </Dialog.Trigger>
      <Dialog.Content className={styles.settings}>
        <div className={styles.top}>
          <SettingsSvg />
          Settings
          <Dialog.Close className="btn">
            <XSvg />
          </Dialog.Close>
        </div>
        <Theme />
        <MaxColumns />
        <MaxCardSize />
        <Profile />
      </Dialog.Content>
    </Dialog>
  );
}
