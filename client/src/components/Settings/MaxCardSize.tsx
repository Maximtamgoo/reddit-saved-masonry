import { css } from "@acab/ecsstatic";
import { useSettingsStore } from "@src/store/settings";
import Rotate from "@src/svg/rotate-ccw.svg?react";
import { cn } from "@src/utils/cn";
import { InputNumber } from "../InputNumber";

const maxCardSize = css`
  display: grid;
  gap: var(--space-3);
`;

const top = css`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  & > button {
    grid-row: span 2;
    align-self: center;
    justify-self: end;
  }
`;

const title = css`
  font-size: var(--text-lg);
  @media (width < 300px) {
    font-size: var(--text-base);
  }
`;

const sizeInputs = css`
  display: flex;
  justify-content: space-between;
  & label {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
  & input {
    border: 1px solid var(--ring-color);
    border-radius: var(--rounded-md);
    background-color: var(--bg);
    padding-left: var(--space-1);
    width: var(--space-16);
    height: var(--space-9);
    font-size: var(--text-base);
    &:user-invalid {
      background-color: red;
    }
  }
  @media (width < 280px) {
    justify-content: space-around;
    & label {
      display: grid;
      font-size: var(--text-sm);
    }
  }
`;

const reset_btn = css`
  display: grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: var(--rounded-full);
  background-color: var(--btn-bg);
  width: var(--space-7);
  height: var(--space-7);
  & > svg {
    width: var(--space-5);
    height: var(--space-5);
  }
`;

const { minCardSize } = useSettingsStore.getInitialState();

export function MaxCardSize() {
  const maxCardWidth = useSettingsStore((s) => s.maxCardWidth);
  const maxCardHeight = useSettingsStore((s) => s.maxCardHeight);
  const { setMaxCardWidth, setMaxCardHeight, resetCardSizes } = useSettingsStore((s) => s.actions);

  return (
    <div className={maxCardSize}>
      <div className={top}>
        <span className={title}>Maximum Card Size</span>
        <button className={cn(reset_btn)} onClick={() => resetCardSizes()}>
          <Rotate />
        </button>
      </div>
      <div className={sizeInputs}>
        <label htmlFor="maxCardWidth">
          Width
          <InputNumber
            required
            value={maxCardWidth}
            min={minCardSize}
            onBlurValue={(v) => setMaxCardWidth(v < minCardSize ? minCardSize : v)}
          />
        </label>
        <label htmlFor="maxCardHeight">
          Height
          <InputNumber
            required
            value={maxCardHeight}
            min={minCardSize}
            onBlurValue={(v) => setMaxCardHeight(v < minCardSize ? minCardSize : v)}
          />
        </label>
      </div>
    </div>
  );
}
