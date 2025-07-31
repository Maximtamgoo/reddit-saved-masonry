import { css } from "@acab/ecsstatic";
import { type ChangeEvent } from "react";
import Sun from "@src/svg/sun.svg?react";
import Moon from "@src/svg/moon.svg?react";
import Eclipse from "@src/svg/eclipse.svg?react";

const group = css`
  display: flex;
  gap: var(--space-2);
`;

const radio = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--btn-bg);
  font-weight: 500;
  height: var(--space-9);
  width: var(--space-24);
  border-radius: var(--rounded-md);
  &:hover {
    background-color: var(--btn-hover);
  }
  & > input[type="radio"] {
    position: absolute;
    appearance: none;
    cursor: pointer;
    inset: 0;
    &:checked + label {
      color: var(--primary);
    }
  }
  & > label {
    display: flex;
    gap: var(--space-1);
  }
`;

const themes = ["light", "auto", "dark"] as const;
type Theme = (typeof themes)[number];

function updateTheme(theme: Theme) {
  localStorage.setItem("theme", theme);
  document.querySelector("html")?.setAttribute("data-theme", theme);
}

function onChange(e: ChangeEvent<HTMLInputElement>) {
  const theme = e.target.id as Theme;
  if (document.startViewTransition) {
    document.startViewTransition(() => updateTheme(theme));
  } else {
    updateTheme(theme);
  }
}

export function ThemeSwitch() {
  const themeAttr = document.querySelector("html")?.getAttribute("data-theme") as Theme;

  return (
    <div className={group}>
      {themes.map((theme) => (
        <div className={radio} key={theme}>
          <input
            type="radio"
            id={theme}
            name="theme"
            onChange={onChange}
            defaultChecked={themeAttr === theme}
          />
          <label htmlFor={theme}>
            {theme === "light" && <Sun />}
            {theme === "auto" && <Eclipse />}
            {theme === "dark" && <Moon />}
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
}
