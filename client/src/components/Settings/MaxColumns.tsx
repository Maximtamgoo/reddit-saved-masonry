import styles from "./MaxColumns.module.css";
import settingsStyles from "./Settings.module.css";
import { useSettingsStore } from "@src/store/settings";
import Columns from "@src/svg/columns-3.svg?react";

const { maxLanesLimit } = useSettingsStore.getInitialState();
const nums = Array.from({ length: maxLanesLimit }, (_, i) => i + 1);

export function MaxColumns() {
  const maxLanes = useSettingsStore((s) => s.maxLanes);
  const { setMaxLanes, resetMaxLanes } = useSettingsStore((s) => s.actions);
  return (
    <div className={styles.maxColumns}>
      <span className={settingsStyles.title_section}>
        <Columns />
        Max Columns
      </span>
      <button className={settingsStyles.resetBtn} onClick={() => resetMaxLanes()}>
        Reset
      </button>
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
