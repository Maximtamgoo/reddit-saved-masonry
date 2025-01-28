import Bookmark from "@src/svg/bookmark.svg?react";
import style from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={style.login}>
      <div className={style.title}>
        <Bookmark />
        Reddit Saved Masonry
      </div>
      <button onClick={() => (window.location.href = "/api/authurl")}>Login with Reddit</button>
      View your saved Reddit posts in a masonry grid.
    </div>
  );
}
