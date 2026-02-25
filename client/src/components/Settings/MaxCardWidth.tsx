import { type ChangeEvent } from "react";
import styles from "./MaxCardSize.module.css";
import { useSettingsStore } from "@src/store/settings";

const { MIN_CARD_SIZE } = useSettingsStore.getInitialState();

export function MaxCardWidth() {
  const userCardWidth = useSettingsStore((s) => s.userCardWidth);
  const { setUserCardWidth } = useSettingsStore((s) => s.actions);

  const minWidthPercent = Math.round((MIN_CARD_SIZE / window.screen.availWidth) * 100);
  const maxWidthPercent = Math.round((userCardWidth / window.screen.availWidth) * 100);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const percent = parseInt(e.currentTarget.value);
    if (isNaN(percent)) return;
    setUserCardWidth(percent);
  }

  return (
    <div className={styles.sizeInput}>
      <input
        type="range"
        value={maxWidthPercent}
        min={minWidthPercent}
        step={1}
        max={100}
        onChange={onChange}
      />
      <div className={styles.label}>
        <span>{maxWidthPercent}%</span> of screen width
      </div>
    </div>
  );
}
