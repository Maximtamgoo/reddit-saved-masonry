import { useId, useState } from "react";
import styles from "./MaxCardSize.module.css";
import { useSettingsStore } from "@src/store/settings";
import { RangeInput } from "../RangeInput/RangeInput";

const { minCardSize } = useSettingsStore.getInitialState();

export function MaxCardWidth() {
  const id = useId();
  const maxCardWidth = useSettingsStore((s) => s.maxCardWidth);
  const { setMaxCardWidth } = useSettingsStore((s) => s.actions);

  const minWidthPercent = Math.round((minCardSize / window.screen.availWidth) * 100);
  const maxWidthPercent = Math.round((maxCardWidth / window.screen.availWidth) * 100);

  const [prev, setPrev] = useState(maxWidthPercent);
  const [widthLabel, setWidthLabel] = useState(maxWidthPercent);

  if (maxWidthPercent !== prev) {
    setPrev(maxWidthPercent);
    setWidthLabel(maxWidthPercent);
  }

  function onChangeValue(v: number) {
    setWidthLabel(v);
  }

  function onPointerUpValue(v: number) {
    setMaxCardWidth(Math.floor((window.screen.availWidth / 100) * v));
  }

  return (
    <div className={styles.sizeInput}>
      <RangeInput
        id={id}
        value={maxWidthPercent}
        min={minWidthPercent}
        step={1}
        max={100}
        onChangeValue={onChangeValue}
        onPointerUpValue={onPointerUpValue}
      />
      <label htmlFor={id} className={styles.label}>
        <span>{widthLabel}%</span> of screen width
      </label>
      {/* <div className={styles.hint}>% of screen width</div> */}
    </div>
  );
}
