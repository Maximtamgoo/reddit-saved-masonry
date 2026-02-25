import { useState } from "react";
import styles from "./Details.module.css";
import Link from "@src/components/Link";
import type { RedditItem } from "@src/schema/RedditItem";
import { useToggleBookmark } from "@src/services/queries";
import { cn } from "@src/utils/cn";
import Bookmark from "@src/svg/bookmark.svg?react";

type Props = {
  item: RedditItem;
};

export default function Details({ item }: Props) {
  const [isImgError, setIsImgError] = useState(false);
  const { mutate, isPending } = useToggleBookmark(item.id);
  const postLink = `https://www.reddit.com${item.permalink}`;
  const subredditLink = `https://www.reddit.com/r/${item.subreddit}`;
  const authorLink = `https://www.reddit.com/u/${item.author}`;

  const icon_url = item.type !== "comment" ? item.icon_url : undefined;

  return (
    <div className={styles.details}>
      <div className={cn("btn", styles.sub_icon)}>
        {!isImgError && icon_url && <img src={icon_url} onError={() => setIsImgError(true)} />}
      </div>
      <div className={cn(styles.credits, "truncate")}>
        <Link className="truncate" href={subredditLink}>
          {item.subreddit_name_prefixed}
        </Link>
        <i>•</i>
        <Link className="truncate" href={authorLink}>
          {item.author}
        </Link>
      </div>
      <button
        className={cn("btn", styles.bookmark)}
        disabled={isPending}
        onClick={() => mutate({ saved: !item.saved })}
      >
        <Bookmark data-saved={item.saved} />
      </button>
      <Link className={cn(styles.title, "truncate")} href={postLink}>
        {item.type === "comment" ? "Comment" : item.title}
      </Link>
    </div>
  );
}
