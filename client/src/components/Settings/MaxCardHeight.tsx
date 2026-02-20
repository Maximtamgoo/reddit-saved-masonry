import { useId, type ChangeEvent } from "react";
import styles from "./MaxCardSize.module.css";
import { useSettingsStore } from "@src/store/settings";

const { MIN_CARD_SIZE } = useSettingsStore.getInitialState();

export function MaxCardHeight() {
  const id = useId();
  const userCardHeight = useSettingsStore((s) => s.userCardHeight);
  const { setUserCardHeight } = useSettingsStore((s) => s.actions);

  const minHeightPercent = Math.round((MIN_CARD_SIZE / window.screen.availHeight) * 100);
  const maxHeightPercent = Math.round((userCardHeight / window.screen.availHeight) * 100);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const percent = parseInt(e.currentTarget.value);
    if (isNaN(percent)) return;
    setUserCardHeight(percent);
  }

  return (
    <div className={styles.sizeInput}>
      <input
        type="range"
        id={id}
        value={maxHeightPercent}
        min={minHeightPercent}
        step={1}
        max={100}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.label}>
        <span>{maxHeightPercent}%</span> of screen height
      </label>
    </div>
  );
}
