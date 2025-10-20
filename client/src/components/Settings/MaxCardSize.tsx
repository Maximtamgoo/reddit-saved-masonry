import styles from "./MaxCardSize.module.css";
import { useSettingsStore } from "@src/store/settings";
import Rotate from "@src/svg/rotate-ccw.svg?react";
import Scaling from "@src/svg/scaling.svg?react";
import { MaxCardWidth } from "./MaxCardWidth";
import { MaxCardHeight } from "./MaxCardHeight";

export function MaxCardSize() {
  const { resetCardSizes } = useSettingsStore((s) => s.actions);

  return (
    <div className={styles.maxCardSize}>
      <div className={styles.top}>
        <span className={styles.title}>
          <Scaling />
          Maximum Card Size
        </span>
        <button className={styles.resetBtn} onClick={() => resetCardSizes()}>
          <Rotate />
        </button>
      </div>
      <MaxCardWidth />
      <MaxCardHeight />
    </div>
  );
}
