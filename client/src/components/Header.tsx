import { css } from "@acab/ecsstatic";
import { useGetSignedInUser, useSignOut } from "@src/services/queries";
import Link from "@src/components/Link";
import Bookmark from "@src/svg/bookmark.svg?react";
import Github from "@src/svg/github.svg?react";
import LogOut from "@src/svg/log-out.svg?react";

const header = css`
  display: grid;
  grid-template-columns: var(--space-10) 1fr repeat(3, var(--space-10));
  gap: var(--space-2);
  margin-top: var(--space-2);
  margin-bottom: var(--space-4);
  outline: 2px solid var(--c-slate-300);
  border-radius: var(--rounded-lg);
  background-color: var(--c-white);
  padding: var(--space-2) var(--space-4);
  overflow: hidden;
  font-size: var(--text-3xl);
  & > svg {
    width: var(--space-10);
    height: var(--space-10);
    color: var(--c-sky-500);
  }
  & > span {
    align-content: center;
    line-height: 1;
  }
`;

const nav_btn = css`
  display: grid;
  place-items: center;
  border-radius: var(--rounded-full);
  background-color: var(--c-slate-100);
  width: var(--space-10);
  height: var(--space-10);
  overflow: hidden;
  color: var(--c-black);
  &:hover {
    background-color: var(--c-slate-200);
  }
`;

export default function Header() {
  const { data, isSuccess } = useGetSignedInUser();
  const { mutate } = useSignOut();

  return (
    <header className={header}>
      <Bookmark />
      <span className="truncate">Reddit Saved Masonry</span>
      {isSuccess && (
        <Link className={nav_btn} href={`https://www.reddit.com/user/${data.name}/saved`}>
          <img src={data.icon_img} />
        </Link>
      )}
      <Link className={nav_btn} href="https://github.com/Maximtamgoo/reddit-saved-masonry">
        <Github />
      </Link>
      <button className={nav_btn} onClick={() => mutate()}>
        <LogOut />
      </button>
    </header>
  );
}
