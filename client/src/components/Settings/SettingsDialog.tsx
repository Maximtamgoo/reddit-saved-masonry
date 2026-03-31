import styles from "./SettingsDialog.module.css";
import { Dialog } from "../Dialog";
import { Settings, X } from "lucide-react";
import { Theme } from "./Theme";
import { MaxColumns } from "./MaxColumns";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";

export function SettingsDialog() {
  return (
    <Dialog>
      <Dialog.Trigger className="btn">
        <Settings />
      </Dialog.Trigger>
      <Dialog.Content className={styles.settings}>
        <div className={styles.top}>
          <Settings />
          Settings
          <Dialog.Close className="btn">
            <X />
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
