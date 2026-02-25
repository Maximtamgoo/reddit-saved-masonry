import styles from "./LoginPage.module.css";
import Bookmark from "@src/svg/bookmark.svg?react";

export default function LoginPage() {
  return (
    <main className={styles.login}>
      <div className={styles.title}>
        <Bookmark />
        Reddit Saved Masonry
      </div>
      <button className="btn" onClick={() => (window.location.href = "/api/authurl")}>
        Sign in with Reddit
      </button>
      View your saved Reddit posts in a masonry grid.
    </main>
  );
}
