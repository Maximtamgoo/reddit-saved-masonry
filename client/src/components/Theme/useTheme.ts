import { useContext } from "react";
import { Context } from "./Context";

export function useTheme() {
  const context = useContext(Context);
  if (!context) throw "Missing Theme Context";
  return context;
}
