import { css } from "@acab/ecsstatic";
import { useState } from "react";
import Sun from "@src/svg/sun.svg?react";
import Moon from "@src/svg/moon.svg?react";
import SunMoon from "@src/svg/sun-moon.svg?react";
import Monitor from "@src/svg/monitor.svg?react";

const theme = css`
  display: grid;
  gap: var(--space-3);
  & > span {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-lg);
    @media (width < 300px) {
      font-size: var(--text-base);
    }
  }
`;

const theme_btns = css`
  display: flex;
  gap: var(--space-1);
  & > button {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    background-color: var(--btn-bg);
    width: fit-content;
    height: var(--space-9);
    color: var(--fg);
    font-weight: 500;
    & > svg {
      min-width: 24px;
    }
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
    @media (width < 300px) {
      & > svg {
        display: none;
      }
    }
  }
`;

const themes = ["light", "auto", "dark"] as const;
type Theme = (typeof themes)[number];

function getInitialTheme() {
  const localTheme = localStorage.getItem("theme") ?? "";
  const isTheme = themes.includes(localTheme as Theme);
  return isTheme ? (localTheme as Theme) : "auto";
}

function updateTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

updateTheme(getInitialTheme());

export function Theme() {
  const [selectedTheme, setSelectedTheme] = useState(getInitialTheme);

  function onClick(theme: Theme) {
    setSelectedTheme(theme);
    if (document.startViewTransition) {
      document.startViewTransition(() => updateTheme(theme));
    } else {
      updateTheme(theme);
    }
  }

  return (
    <div className={theme}>
      <span>
        <SunMoon />
        Theme
      </span>
      <div className={theme_btns}>
        {themes.map((theme) => (
          <button
            key={theme}
            data-selected={theme === selectedTheme || undefined}
            onClick={() => onClick(theme)}
          >
            {theme === "light" && <Sun />}
            {theme === "auto" && <Monitor />}
            {theme === "dark" && <Moon />}
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
