import type { ComponentProps } from "react";

export default function Link({ children, ...props }: ComponentProps<"a">) {
  return (
    <a href="#" target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}
