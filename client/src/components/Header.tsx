import { css } from "@acab/ecsstatic";
import { useSignOut } from "@src/services/queries";
import { cn } from "@src/utils/cn";
import Link from "@src/components/Link";
import Bookmark from "@src/svg/bookmark.svg?react";
import Github from "@src/svg/github.svg?react";
import Sun from "@src/svg/sun.svg?react";
import Moon from "@src/svg/moon.svg?react";
import { useTheme } from "./Theme";

const header = css`
  position: sticky;
  top: 0;
  z-index: 10;
  margin-bottom: var(--space-3);
  border-bottom: 1px solid var(--ring-color);
  background-color: var(--bg);
`;

const nav_bar = css`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-6);
  & > span {
    flex-grow: 1;
    color: var(--primary);
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
  background-color: var(--btn-bg);
  color: var(--fg);
  overflow: hidden;
  &:hover {
    background-color: var(--btn-hover);
  }
`;

const bookmark = css`
  flex-shrink: 0;
  margin-inline: -0.1rem -0.25rem;
  width: var(--space-9);
  height: var(--space-9);
  color: var(--primary);
`;

const github = css`
  background-color: var(--bg);
  & > svg {
    fill: var(--btn-bg);
  }
  &:hover {
    background-color: var(--bg);
  }
  & > svg:hover {
    fill: var(--btn-hover);
  }
`;

const profile = css`
  & > img {
    border-radius: var(--rounded-full);
  }
  &:hover {
    filter: brightness(1.1);
  }
`;

const signOut = css`
  padding-inline: var(--space-3);
  width: auto;
  font-weight: 500;
  font-size: var(--text-sm);
`;

type Props = {
  username?: string;
  icon_img?: string;
};

export default function Header({ username, icon_img }: Props) {
  const { setTheme } = useTheme();
  const { mutate } = useSignOut();

  return (
    <header className={header}>
      <nav className={nav_bar}>
        <Bookmark className={bookmark} />
        <span className="truncate">Reddit Saved Masonry</span>
        <button className={nav_btn} onClick={() => setTheme("light")}>
          <Sun />
        </button>
        <button className={nav_btn} onClick={() => setTheme("dark")}>
          <Moon />
        </button>
        <Link
          className={cn(nav_btn, github)}
          href="https://github.com/Maximtamgoo/reddit-saved-masonry"
        >
          <Github />
        </Link>
        {username && (
          <Link
            className={cn(nav_btn, profile)}
            href={`https://www.reddit.com/user/${username}/saved`}
          >
            {icon_img && <img src={icon_img} />}
          </Link>
        )}
        {username && (
          <button className={cn(nav_btn, signOut)} onClick={() => mutate()}>
            Sign out
          </button>
        )}
      </nav>
    </header>
  );
}
