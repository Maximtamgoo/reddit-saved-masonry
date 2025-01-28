import { RedditItem } from "@src/schema/RedditItem";
import ArrowRedirect from "@src/svg/square-arrow-out-up-right.svg?react";
import Link from "../Link";
import { Gallery } from "./Gallery/Gallery";
import style from "./Modal.module.css";

type Props = {
  item: RedditItem;
};

export default function Modal({ item }: Props) {
  return (
    <div className={style.modal}>
      {item.type === "gallery" && <Gallery items={item.gallery} />}
      {item.type === "image" && <Gallery items={[item]} />}
      {item.type === "playable" && <Gallery items={[item]} />}
      <Link
        className={style.redirect}
        href={`https://www.reddit.com${item.permalink}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowRedirect />
      </Link>
    </div>
  );
}
