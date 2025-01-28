import Link from "@src/components/Link";
import type { RedditItem } from "@src/schema/RedditItem";
import { useToggleBookmark } from "@src/services/queries";
import Bookmark from "@src/svg/bookmark.svg?react";
import { memo, useState } from "react";
import style from "./Card.module.css";

type Props = {
  item: RedditItem;
};

export default memo(function Details({ item }: Props) {
  const [isImgError, setIsImgError] = useState(false);
  const { mutate, isPending } = useToggleBookmark(item.id, item.pageParam);
  const postLink = `https://www.reddit.com${item.permalink}`;
  const subredditLink = `https://www.reddit.com/r/${item.subreddit}`;
  const authorLink = `https://www.reddit.com/u/${item.author}`;

  const icon_url = item.type !== "comment" ? item.icon_url : undefined;

  return (
    <div className={style.details}>
      <div className={style.sr_img}>
        {!isImgError && icon_url && <img src={icon_url} onError={() => setIsImgError(true)} />}
      </div>
      <div className={`${style.link_wrapper} truncate`}>
        <Link href={subredditLink}>{item.subreddit_name_prefixed}</Link>
        <i>&bull;</i>
        <Link href={authorLink}>u/{item.author}</Link>
      </div>
      <button
        className={style.bookmark_btn}
        disabled={isPending}
        onClick={() => mutate({ saved: !item.saved })}
      >
        <Bookmark data-saved={item.saved} />
      </button>
      <Link className={`${style.title} truncate`} href={postLink}>
        {item.type === "comment" ? "Comment" : item.title}
      </Link>
    </div>
  );
});
