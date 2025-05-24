import { createContext } from "react";

export type Theme = "light" | "dark";

type Context = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const Context = createContext<Context | null>(null);
