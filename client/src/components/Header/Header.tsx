import { cn } from "@src/utils/cn";
import styles from "./Header.module.css";
import Link from "@src/components/Link";
import { Bookmark } from "lucide-react";
import { Github } from "../Github";
import { SettingsDialog } from "../Settings/SettingsDialog";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <Bookmark className={styles.bookmark} />
        <span className={cn(styles.title, "truncate")}>Reddit Saved Masonry</span>
        <Link
          className={cn("btn", styles.github)}
          href="https://github.com/Maximtamgoo/reddit-saved-masonry"
        >
          <Github />
        </Link>
        <SettingsDialog />
      </nav>
    </header>
  );
}
