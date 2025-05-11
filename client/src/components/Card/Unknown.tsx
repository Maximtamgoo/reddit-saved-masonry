import { css } from "@acab/ecsstatic";

const unknown = css`
  display: grid;
  place-items: center;
  font-size: var(--space-20);
  color: var(--c-black);
  height: 100%;
`;

export default function Unknown() {
  return <div className={unknown}>?</div>;
}
