import { createContext } from "react";

export type Theme = "system" | "light" | "dark";

type Context = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const Context = createContext<Context | null>(null);
