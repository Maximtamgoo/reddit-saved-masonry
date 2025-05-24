import { useEffect, useState, type PropsWithChildren } from "react";
import { Context, type Theme } from "./Context";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return <Context value={{ theme, setTheme }}>{children}</Context>;
}
