import { css } from "@acab/ecsstatic";
import { cn } from "@src/utils/cn";
import Link from "@src/components/Link";
import Bookmark from "@src/svg/bookmark.svg?react";
import Github from "@src/svg/github.svg?react";
import SettingsPopover from "./Settings/SettingsPopover";

const header = css`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--ring-color);
  background-color: var(--bg);
`;

const nav_bar = css`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: var(--space-2);
  transition: max-width 0.5s ease;
  margin: auto;
  padding: var(--space-2) var(--space-4);
  max-width: var(--masonry-max-width, 405px);
  & > span {
    color: var(--primary);
    font-size: var(--text-2xl);
  }
`;

const bookmark = css`
  flex-shrink: 0;
  width: var(--space-9);
  height: var(--space-9);
  color: var(--primary);
`;

const github = css`
  background-color: var(--bg);
  &:hover {
    background-color: var(--bg);
  }
  & > svg {
    fill: var(--btn-bg);
    &:hover {
      fill: var(--btn-hover);
    }
  }
`;

export default function Header() {
  return (
    <header className={header}>
      <nav className={nav_bar}>
        <Bookmark className={bookmark} />
        <span className="truncate">Reddit Saved Masonry</span>
        <Link
          className={cn("btn", github)}
          href="https://github.com/Maximtamgoo/reddit-saved-masonry"
        >
          <Github />
        </Link>
        <SettingsPopover />
      </nav>
    </header>
  );
}
