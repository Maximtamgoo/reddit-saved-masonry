import { css } from "@acab/ecsstatic";
import type { PropsWithChildren } from "react";

const text = css`
  padding-inline: var(--space-4);
  overflow: hidden;
  white-space: break-spaces;
  word-wrap: break-word;
  color: var(--fg);
`;

export default function Text({ children }: PropsWithChildren) {
  return <div className={text}>{children}</div>;
}
