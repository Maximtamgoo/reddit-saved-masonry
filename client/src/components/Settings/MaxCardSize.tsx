import styles from "./MaxCardSize.module.css";
import settingsStyles from "./SettingsPopover.module.css";
import { useSettingsStore } from "@src/store/settings";
import Scaling from "@src/svg/scaling.svg?react";
import { MaxCardWidth } from "./MaxCardWidth";
import { MaxCardHeight } from "./MaxCardHeight";

export function MaxCardSize() {
  const { resetCardSizes } = useSettingsStore((s) => s.actions);

  return (
    <div className={styles.maxCardSize}>
      <span className={settingsStyles.title_section}>
        <Scaling />
        Max Card Size
      </span>
      <button className={settingsStyles.resetBtn} onClick={() => resetCardSizes()}>
        Reset
      </button>
      <MaxCardWidth />
      <MaxCardHeight />
    </div>
  );
}
