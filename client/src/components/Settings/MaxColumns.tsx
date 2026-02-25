import { cn } from "@src/utils/cn";
import styles from "./MaxColumns.module.css";
import shared from "./Shared.module.css";
import { useSettingsStore } from "@src/store/settings";
import Columns from "@src/svg/columns-3.svg?react";

const { MAX_LANES_LIMIT } = useSettingsStore.getInitialState();
const nums = Array.from({ length: MAX_LANES_LIMIT }, (_, i) => i + 1);

export function MaxColumns() {
  const maxLanes = useSettingsStore((s) => s.maxLanes);
  const { setMaxLanes, resetMaxLanes } = useSettingsStore((s) => s.actions);
  return (
    <div className={shared.section}>
      <span className={shared.title}>
        <Columns />
        Max Columns
        <button className={cn("btn", shared.reset)} onClick={() => resetMaxLanes()}>
          Reset
        </button>
      </span>
      <div className={styles.num_btns}>
        {nums.map((n) => (
          <button
            key={n}
            className="btn"
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
