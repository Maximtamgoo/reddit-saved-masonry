import styles from "./MaxColumns.module.css";
import { useSettingsStore } from "@src/store/settings";
import Rotate from "@src/svg/rotate-ccw.svg?react";
import Columns from "@src/svg/columns-3.svg?react";

const { maxLanesLimit } = useSettingsStore.getInitialState();
const nums = Array.from({ length: maxLanesLimit }, (_, i) => i + 1);

export function MaxColumns() {
  const maxLanes = useSettingsStore((s) => s.maxLanes);
  const { setMaxLanes, resetMaxLanes } = useSettingsStore((s) => s.actions);
  return (
    <div className={styles.maxColumns}>
      <div className={styles.top}>
        <span className={styles.title}>
          <Columns />
          Maximum Columns
        </span>
        <button className={styles.resetBtn} onClick={() => resetMaxLanes()}>
          <Rotate />
        </button>
      </div>
      <div className={styles.numBtns}>
        {nums.map((n) => (
          <button
            key={n}
            data-selected={n === maxLanes || undefined}
            onClick={() => setMaxLanes(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
