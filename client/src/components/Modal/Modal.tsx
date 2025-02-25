import Link from "@src/components/Link";
import { RedditItem } from "@src/schema/RedditItem";
import ArrowRedirect from "@src/svg/square-arrow-out-up-right.svg?react";
import { cn } from "@src/utils/cn";
import Gallery from "./Gallery";
import style from "./Modal.module.css";

type Props = {
  item: Extract<RedditItem, { type: "gallery" } | { type: "image" } | { type: "playable" }>;
};

export default function Modal({ item }: Props) {
  return (
    <div className={style.modal}>
      <Gallery items={item.type === "gallery" ? item.gallery : [item]} />
      <Link
        className={cn(style.modal_btn, style.redirect)}
        href={`https://www.reddit.com${item.permalink}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowRedirect />
      </Link>
    </div>
  );
}
