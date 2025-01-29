import Link from "@src/components/Link";
import { useGetSignedInUser, useSignOut } from "@src/services/queries";
import Bookmark from "@src/svg/bookmark.svg?react";
import Github from "@src/svg/github.svg?react";
import LogOut from "@src/svg/log-out.svg?react";
import style from "./Header.module.css";

export default function Header() {
  const { data, isSuccess } = useGetSignedInUser();
  const { mutate } = useSignOut();

  return (
    <header className={style.header}>
      <Bookmark />
      <span className="truncate">Reddit Saved Masonry</span>
      <Link href={`https://www.reddit.com/user/${data?.name}/saved`}>
        {isSuccess && <img src={data.icon_img} />}
      </Link>
      <Link href="https://github.com/Maximtamgoo/reddit-saved-masonry">
        <Github />
      </Link>
      <button onClick={() => mutate()}>
        <LogOut />
      </button>
    </header>
  );
}
