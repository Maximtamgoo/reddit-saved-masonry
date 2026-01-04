import { createContext } from "react";

type Context = {
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Context = createContext<Context>({
  id: "",
  isOpen: false,
  setIsOpen: () => {},
});
