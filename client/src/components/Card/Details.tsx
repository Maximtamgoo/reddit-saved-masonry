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
  gap: var(--space-2);
  padding: var(--space-4);
`;

const links = css`
  align-content: center;
  & > a {
    color: var(--c-black);
    text-decoration: none;
    &:hover {
      color: var(--c-blue-800);
    }
  }
  & > i {
    margin-inline: var(--space-1);
  }
`;

const btn_base = css`
  display: grid;
  place-items: center;
  border-radius: var(--rounded-full);
  background-color: var(--c-slate-100);
  width: var(--space-10);
  height: var(--space-10);
  overflow: hidden;
  color: var(--c-black);
`;

const icon = css`
  border: 1px solid var(--c-slate-100);
`;

const bookmark = css`
  color: var(--c-sky-500);

  &:hover {
    background-color: var(--c-slate-200);
  }
  & > svg[data-saved="false"] {
    fill: none;
  }
`;

const title = css`
  grid-column: span 3;
  max-width: fit-content;
  color: var(--c-black);
  font-weight: 500;
  font-size: var(--text-xl);
  text-decoration: none;
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
      <div className={cn(btn_base, icon)}>
        {!isImgError && icon_url && <img src={icon_url} onError={() => setIsImgError(true)} />}
      </div>
      <div className={cn(links, "truncate")}>
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
