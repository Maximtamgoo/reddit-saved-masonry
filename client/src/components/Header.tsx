import { css } from "@acab/ecsstatic";
import { useGetSignedInUser, useSignOut } from "@src/services/queries";
import { cn } from "@src/utils/cn";
import Link from "@src/components/Link";
import Bookmark from "@src/svg/bookmark.svg?react";
import Github from "@src/svg/github.svg?react";
import Moon from "@src/svg/moon.svg?react";

const header = css`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  gap: var(--space-2);
  z-index: 10;
  margin-bottom: var(--space-2);
  border: 1px solid var(--ring-color);
  border-top: none;
  border-radius: 0 0 var(--rounded-lg) var(--rounded-lg);
  background-color: var(--header-bg);
  padding: var(--space-2) var(--space-4);
  & > span {
    flex-grow: 1;
    font-size: var(--text-2xl);
  }
`;

const nav_btn = css`
  display: grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: var(--rounded-full);
  width: var(--space-8);
  height: var(--space-8);
  color: var(--c-black);
  background-color: var(--btn-bg);
  &:hover {
    background-color: var(--btn-hover);
  }
`;

const bookmark = css`
  flex-shrink: 0;
  margin-inline: calc(var(--space-1) * -1);
  width: var(--space-9);
  height: var(--space-9);
  color: var(--c-sky-500);
`;

const profile = css`
  overflow: hidden;
  &:hover {
    filter: brightness(0.9);
  }
`;

const logOut = css`
  padding-inline: var(--space-3);
  width: auto;
  font-weight: 500;
  font-size: var(--text-sm);
`;

export default function Header() {
  const { data, isSuccess } = useGetSignedInUser();
  const { mutate } = useSignOut();

  return (
    <header className={header}>
      <Bookmark className={bookmark} />
      <span className="truncate">Reddit Saved Masonry</span>
      <button className={nav_btn}>
        <Moon />
      </button>
      <Link className={nav_btn} href="https://github.com/Maximtamgoo/reddit-saved-masonry">
        <Github />
      </Link>
      <Link
        className={cn(nav_btn, profile)}
        href={`https://www.reddit.com/user/${data?.name}/saved`}
      >
        {isSuccess && <img src={data.icon_img} />}
      </Link>
      <button className={cn(nav_btn, logOut)} onClick={() => mutate()}>
        Log out
      </button>
    </header>
  );
}
