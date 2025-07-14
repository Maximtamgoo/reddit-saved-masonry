import { useState } from "react";
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
  column-gap: var(--space-2);
  row-gap: var(--space-1);
  padding: var(--space-4);
  padding-bottom: var(--space-3);
`;

const btn_base = css`
  display: grid;
  place-items: center;
  border-radius: var(--rounded-full);
  width: var(--space-9);
  height: var(--space-9);
  background-color: var(--btn-bg);
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const credits = css`
  color: var(--fg);
  height: 42px;
  font-size: var(--text-base);
  align-content: center;
  padding: 2px;
  margin: -2px;
  & > a {
    max-width: fit-content;
    color: inherit;
    text-decoration: none;
  }
  & > a:hover {
    text-decoration: underline;
  }
  & > :first-child {
    font-weight: 600;
  }
  & > i {
    margin-inline: var(--space-1);
  }

  @container card (width < 375px) {
    display: grid;
    font-size: var(--text-sm);
    & > i {
      display: none;
    }
  }
`;

const bookmark = css`
  color: var(--primary);
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
  color: var(--primary);
  font-weight: 500;
  font-size: var(--text-xl);
  text-decoration: none;
  &:hover {
    color: var(--primary-hover);
  }
`;

type Props = {
  item: RedditItem;
};

export default function Details({ item }: Props) {
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
        <Link className="truncate" href={subredditLink}>
          {item.subreddit_name_prefixed}
        </Link>
        <i>•</i>
        <Link className="truncate" href={authorLink}>
          u/{item.author}
        </Link>
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
}
