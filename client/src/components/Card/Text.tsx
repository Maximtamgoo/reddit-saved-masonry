import { css } from "@acab/ecsstatic";

const className = css`
  padding-inline: var(--space-4);
  overflow: hidden;
  white-space: break-spaces;
  word-break: break-all;
`;

type Props = {
  text: string;
};

export default function Text({ text }: Props) {
  return <div className={className}>{text}</div>;
}
