import { useState } from "react";
import styles from "./Theme.module.css";
import settingsStyles from "./Settings.module.css";
import Sun from "@src/svg/sun.svg?react";
import Moon from "@src/svg/moon.svg?react";
import Monitor from "@src/svg/monitor.svg?react";

const themes = ["light", "auto", "dark"] as const;
type Theme = (typeof themes)[number];

function getTheme() {
  const localTheme = localStorage.getItem("theme") ?? "";
  const isTheme = themes.includes(localTheme as Theme);
  return isTheme ? (localTheme as Theme) : "auto";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

setTheme(getTheme());

export function Theme() {
  const [selectedTheme, setSelectedTheme] = useState(getTheme);

  function onClick(theme: Theme) {
    setSelectedTheme(theme);
    if (document.startViewTransition) {
      document.startViewTransition(() => setTheme(theme));
    } else {
      setTheme(theme);
    }
  }

  return (
    <div className={styles.theme}>
      <span className={settingsStyles.title_section}>
        <Monitor />
        Theme
      </span>
      <div className={styles.themeBtns}>
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
