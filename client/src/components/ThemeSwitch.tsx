import { css } from "@acab/ecsstatic";
import { type ChangeEvent } from "react";
import Sun from "@src/svg/sun.svg?react";
import Moon from "@src/svg/moon.svg?react";
import Eclipse from "@src/svg/eclipse.svg?react";

const group = css`
  background-color: var(--btn-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ring-color);
  border-radius: var(--rounded-3xl);
  padding-inline: var(--space-1);
  height: var(--space-9);
  width: fit-content;
  gap: var(--space-1);
`;

const radio = css`
  position: relative;
  height: var(--space-7);
  width: var(--space-7);
  border-radius: var(--rounded-full);
  overflow: hidden;
  & > input[type="radio"] {
    appearance: none;
    &:checked + label > svg {
      color: var(--primary);
    }
    &:hover + label {
      background-color: var(--btn-hover);
    }
  }
  & > label {
    display: grid;
    position: absolute;
    place-items: center;
    cursor: pointer;
    inset: 0;
  }
`;

type Theme = "auto" | "light" | "dark";
const initTheme = document.querySelector("html")?.getAttribute("data-theme") as Theme;

function onChange(e: ChangeEvent<HTMLInputElement>) {
  const theme = e.target.id as Theme;
  localStorage.setItem("theme", theme);
  document.querySelector("html")?.setAttribute("data-theme", theme);
}

export function ThemeSwitch() {
  return (
    <div className={group}>
      <div className={radio}>
        <input
          type="radio"
          id="light"
          name="theme"
          onChange={onChange}
          defaultChecked={initTheme === "light"}
        />
        <label htmlFor="light">
          <Sun />
        </label>
      </div>
      <div className={radio}>
        <input
          type="radio"
          id="auto"
          name="theme"
          onChange={onChange}
          defaultChecked={initTheme === "auto"}
        />
        <label htmlFor="auto">
          <Eclipse />
        </label>
      </div>
      <div className={radio}>
        <input
          type="radio"
          id="dark"
          name="theme"
          onChange={onChange}
          defaultChecked={initTheme === "dark"}
        />
        <label htmlFor="dark">
          <Moon />
        </label>
      </div>
    </div>
  );
}
