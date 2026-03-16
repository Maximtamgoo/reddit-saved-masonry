import { type ChangeEvent } from "react";
import styles from "./MaxCardSize.module.css";
import { useSettingsStore } from "@src/store/settings";

const { MIN_CARD_SIZE } = useSettingsStore.getInitialState();

export function MaxCardWidth() {
  const cardWidthPercent = useSettingsStore((s) => s.cardWidthPercent);
  const { setCardWidthPercent } = useSettingsStore((s) => s.actions);

  const min = Math.floor((MIN_CARD_SIZE / window.screen.availWidth) * 100);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const percent = parseInt(e.currentTarget.value);
    if (isNaN(percent)) return;
    setCardWidthPercent(percent);
  }

  return (
    <div className={styles.sizeInput}>
      <input
        type="range"
        value={cardWidthPercent}
        min={min}
        step={1}
        max={100}
        onChange={onChange}
      />
      <div className={styles.label}>
        <span>{cardWidthPercent}%</span> of screen width
      </div>
    </div>
  );
}
