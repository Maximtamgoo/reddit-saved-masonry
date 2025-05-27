import { useEffect, useState, type PropsWithChildren } from "react";
import { Context, type Theme } from "./Context";

const initTheme = (localStorage.getItem("theme") as Theme) ?? "system";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(initTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return <Context value={{ theme, setTheme }}>{children}</Context>;
}
