import { css } from "@acab/ecsstatic";
import Bookmark from "@src/svg/bookmark.svg?react";

const login = css`
  text-align: center;
  padding: var(--space-2);
  align-content: end;
  height: 50vh;
`;

const title = css`
  color: var(--primary);
  font-size: var(--text-4xl);
  text-wrap: balance;
  & > svg {
    display: inline;
    vertical-align: middle;
    margin-top: -6px;
    width: var(--space-9);
    height: var(--space-9);
  }
`;

const btn = css`
  display: block;
  margin: var(--space-10) auto;
  border-radius: var(--rounded-lg);
  background-color: var(--btn-bg);
  width: var(--space-40);
  height: var(--space-10);
  &:hover {
    background-color: var(--btn-hover);
  }
`;

export default function LoginPage() {
  return (
    <main className={login}>
      <div className={title}>
        <Bookmark />
        Reddit Saved Masonry
      </div>
      <button className={btn} onClick={() => (window.location.href = "/api/authurl")}>
        Sign in with Reddit
      </button>
      View your saved Reddit posts in a masonry grid.
    </main>
  );
}
