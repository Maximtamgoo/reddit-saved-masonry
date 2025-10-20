import { useId, useState } from "react";
import styles from "./MaxCardSize.module.css";
import { useSettingsStore } from "@src/store/settings";
import { RangeInput } from "../RangeInput/RangeInput";

const { minCardSize } = useSettingsStore.getInitialState();

export function MaxCardHeight() {
  const id = useId();
  const maxCardHeight = useSettingsStore((s) => s.maxCardHeight);
  const { setMaxCardHeight } = useSettingsStore((s) => s.actions);

  const minHeightPercent = Math.round((minCardSize / window.screen.availHeight) * 100);
  const maxHeightPercent = Math.round((maxCardHeight / window.screen.availHeight) * 100);

  const [prev, setPrev] = useState(maxHeightPercent);
  const [heightLabel, setHeightLabel] = useState(maxHeightPercent);

  if (maxHeightPercent !== prev) {
    setPrev(maxHeightPercent);
    setHeightLabel(maxHeightPercent);
  }

  function onChangeValue(v: number) {
    setHeightLabel(v);
  }

  function onPointerUpValue(v: number) {
    setMaxCardHeight(Math.floor((window.screen.availHeight / 100) * v));
  }

  return (
    <div className={styles.sizeInput}>
      <RangeInput
        id={id}
        value={maxHeightPercent}
        min={minHeightPercent}
        step={1}
        max={100}
        onChangeValue={onChangeValue}
        onPointerUpValue={onPointerUpValue}
      />
      <label htmlFor={id} className={styles.label}>
        <span>{heightLabel}%</span> of screen height
      </label>
      {/* <div className={styles.hint}>% of screen height</div> */}
    </div>
  );
}
