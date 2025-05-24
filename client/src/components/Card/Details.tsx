import { memo, useState } from "react";
import { css } from "@acab/ecsstatic";
import Link from "@src/components/Link";
import type { RedditItem } from "@src/schema/RedditItem";
import { useToggleBookmark } from "@src/services/queries";
import { cn } from "@src/utils/cn";
import Bookmark from "@src/svg/bookmark.svg?react";

const details = css`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
`;

const btn_base = css`
  display: grid;
  place-items: center;
  border-radius: var(--rounded-full);
  width: var(--space-9);
  height: var(--space-9);
  background-color: var(--btn-bg);
  overflow: hidden;
`;

const credits = css`
  color: var(--credit);
  & > a {
    margin-inline: 2px;
    color: inherit;
    text-decoration: none;
  }
  & > a:hover {
    color: var(--credit-hover);
    text-decoration: underline;
  }
  & > i {
    margin-inline: var(--space-1);
  }
`;

const bookmark = css`
  color: var(--title);
  &:hover {
    background-color: var(--btn-hover);
  }
  & > svg[data-saved="false"] {
    fill: none;
  }
`;

const title = css`
  grid-column: span 3;
  max-width: fit-content;
  color: var(--title);
  font-weight: 500;
  font-size: var(--text-xl);
  line-height: 1.4;
  text-decoration: none;
  &:hover {
    color: var(--title-hover);
  }
`;

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
    <div className={details}>
      <div className={btn_base}>
        {!isImgError && icon_url && <img src={icon_url} onError={() => setIsImgError(true)} />}
      </div>
      <div className={cn(credits, "truncate")}>
        <Link href={subredditLink}>{item.subreddit_name_prefixed}</Link>
        <i>&bull;</i>
        <Link href={authorLink}>u/{item.author}</Link>
      </div>
      <button
        className={cn(btn_base, bookmark)}
        disabled={isPending}
        onClick={() => mutate({ saved: !item.saved })}
      >
        <Bookmark data-saved={item.saved} />
      </button>
      <Link className={cn(title, "truncate")} href={postLink}>
        {item.type === "comment" ? "Comment" : item.title}
      </Link>
    </div>
  );
});
