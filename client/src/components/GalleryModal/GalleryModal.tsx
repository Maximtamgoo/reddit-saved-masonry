import { useGallery } from "@src/hooks/useGallery";
import { RedditItem } from "@src/schema/RedditItem";
import ArrowRedirect from "@src/svg/square-arrow-out-up-right.svg?react";
import Link from "../Link";
import ArrowBtn from "./ArrowBtn";
import style from "./GalleryModal.module.css";
import Image from "./Image";
import Playable from "./Playable";

type Props = {
  redditItem: RedditItem;
};

export default function GalleryModal({ redditItem }: Props) {
  const isGallery = redditItem.type === "gallery";
  const galleryLength = isGallery ? redditItem.gallery.length : 0;
  const { index, prevIndex, nextIndex } = useGallery(galleryLength);
  const item = isGallery ? redditItem.gallery[index] : redditItem;

  return (
    <div className={style.modal}>
      {item.type === "image" && <Image key={item.source.url} url={item.source.url} />}
      {item.type === "playable" && (
        <Playable key={item.source.url} url={item.source.url} poster={item.preview.url} />
      )}
      {galleryLength > 1 && (
        <>
          {index > 0 && <ArrowBtn direction="left" onClick={prevIndex} />}
          <div className={style.item_num}>
            {index + 1} / {galleryLength}
          </div>
          {index < galleryLength - 1 && <ArrowBtn direction="right" onClick={nextIndex} />}
        </>
      )}
      <Link
        className={style.redirect}
        href={`https://www.reddit.com${redditItem.permalink}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowRedirect />
      </Link>
    </div>
  );
}
