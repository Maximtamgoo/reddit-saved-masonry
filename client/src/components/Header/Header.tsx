import { cn } from "@src/utils/cn";
import Link from "@src/components/Link";
import Bookmark from "@src/svg/bookmark.svg?react";
import Github from "@src/svg/github.svg?react";
import styles from "./Header.module.css";
import Settings from "../Settings/Settings";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <Bookmark className={styles.bookmark} />
        <span className="truncate">Reddit Saved Masonry</span>
        <Link
          className={cn("btn", styles.github)}
          href="https://github.com/Maximtamgoo/reddit-saved-masonry"
        >
          <Github />
        </Link>
        <Settings />
      </nav>
    </header>
  );
}
