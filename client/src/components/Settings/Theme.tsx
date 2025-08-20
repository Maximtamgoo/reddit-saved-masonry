import { css } from "@acab/ecsstatic";
import Sun from "@src/svg/sun.svg?react";
import Moon from "@src/svg/moon.svg?react";
import Eclipse from "@src/svg/eclipse.svg?react";
import { useState } from "react";

const theme = css`
  display: grid;
  gap: var(--space-3);
  & > span {
    font-size: var(--text-lg);
  }
`;

const theme_btns = css`
  display: flex;
  gap: var(--space-1);
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-1);
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

const themes = ["light", "auto", "dark"] as const;
type Theme = (typeof themes)[number];

const localTheme = localStorage.getItem("theme") ?? "";
const isTheme = ["auto", "light", "dark"].includes(localTheme);
const initialTheme = isTheme ? localTheme : "auto";
document.documentElement.setAttribute("data-theme", initialTheme);
localStorage.setItem("theme", initialTheme);

export function Theme() {
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  function updateTheme(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme);
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
  }

  function onClick(theme: Theme) {
    if (document.startViewTransition) {
      document.startViewTransition(() => updateTheme(theme));
    } else {
      updateTheme(theme);
    }
  }

  return (
    <div className={theme}>
      <span>Theme</span>
      <div className={theme_btns}>
        {themes.map((theme) => (
          <button
            key={theme}
            data-selected={theme === selectedTheme || undefined}
            onClick={() => onClick(theme)}
          >
            {theme === "light" && <Sun />}
            {theme === "auto" && <Eclipse />}
            {theme === "dark" && <Moon />}
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
