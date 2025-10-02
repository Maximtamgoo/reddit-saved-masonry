import styles from "./MaxCardSize.module.css";
import { useSettingsStore } from "@src/store/settings";
import Rotate from "@src/svg/rotate-ccw.svg?react";
import Scaling from "@src/svg/scaling.svg?react";
import { cn } from "@src/utils/cn";
import { InputNumber } from "../InputNumber";

const { minCardSize } = useSettingsStore.getInitialState();

export function MaxCardSize() {
  const maxCardWidth = useSettingsStore((s) => s.maxCardWidth);
  const maxCardHeight = useSettingsStore((s) => s.maxCardHeight);
  const { setMaxCardWidth, setMaxCardHeight, resetCardSizes } = useSettingsStore((s) => s.actions);

  return (
    <div className={styles.maxCardSize}>
      <div className={styles.top}>
        <span className={styles.title}>
          <Scaling />
          Maximum Card Size
        </span>
        <button className={cn(styles.resetBtn)} onClick={() => resetCardSizes()}>
          <Rotate />
        </button>
      </div>
      <div className={styles.sizeInputs}>
        <label htmlFor="maxCardWidth">
          Width
          <InputNumber
            required
            value={maxCardWidth}
            min={minCardSize}
            onBlurValue={(v) => setMaxCardWidth(Math.max(minCardSize, v))}
          />
        </label>
        <label htmlFor="maxCardHeight">
          Height
          <InputNumber
            required
            value={maxCardHeight}
            min={minCardSize}
            onBlurValue={(v) => setMaxCardHeight(Math.max(minCardSize, v))}
          />
        </label>
      </div>
    </div>
  );
}
