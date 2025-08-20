import { css } from "@acab/ecsstatic";
import { useSettingsStore } from "@src/store/settings";
import Rotate from "@src/svg/rotate-ccw.svg?react";

const maxColumns = css`
  display: grid;
  gap: var(--space-3);
`;

const top = css`
  display: flex;
`;

const title = css`
  font-size: var(--text-lg);
  flex-grow: 1;
  align-content: center;
`;

const num_btns = css`
  display: flex;
  gap: var(--space-1);
  & > button {
    background-color: var(--btn-bg);
    width: 100%;
    height: var(--space-9);
    color: var(--fg);
    font-weight: 500;
    &:focus-visible,
    &:hover {
      outline: 2px solid var(--primary-hover);
      background-color: var(--btn-hover);
    }
    &:first-child {
      border-radius: var(--rounded-md) 0 0 var(--rounded-md);
    }
    &:last-child {
      border-radius: 0 var(--rounded-md) var(--rounded-md) 0;
    }
    &[data-selected="true"] {
      color: var(--primary);
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

const { maxLanesLimit } = useSettingsStore.getInitialState();

export function MaxColumns() {
  const nums = Array.from({ length: maxLanesLimit }, (_, i) => i + 1);
  const maxLanes = useSettingsStore((s) => s.maxLanes);
  const { setMaxLanes, resetMaxLanes } = useSettingsStore((s) => s.actions);
  return (
    <div className={maxColumns}>
      <div className={top}>
        <span className={title}>Maximum Columns</span>
        <button className={reset_btn} onClick={() => resetMaxLanes()}>
          <Rotate />
        </button>
      </div>
      <div className={num_btns}>
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
