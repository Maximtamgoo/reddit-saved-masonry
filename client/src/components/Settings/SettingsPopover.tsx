import { Popover } from "../Popover/Popover";
import styles from "./SettingsPopover.module.css";
import SettingsSvg from "@src/svg/settings.svg?react";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";

export default function SettingsPopover() {
  return (
    <Popover>
      <Popover.Trigger className="btn">
        <SettingsSvg />
      </Popover.Trigger>
      <Popover.Content className={styles.popover}>
        <div className={styles.container}>
          <Popover.Close className="btn">X</Popover.Close>
          <Theme />
          <MaxColumns />
          <MaxCardSize />
          <Profile />
        </div>
      </Popover.Content>
      {/* <Popover.Backdrop className={styles.backdrop} /> */}
    </Popover>
  );
}
