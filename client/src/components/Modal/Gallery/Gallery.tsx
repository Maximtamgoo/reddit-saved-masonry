import { useGallery } from "@src/hooks/useGallery";
import { GalleryItem } from "@src/schema/RedditItem";
import Image from "../Image";
import Playable from "../Playable";
import ArrowBtn from "./ArrowBtn";
import style from "./Gallery.module.css";

type Props = {
  items: GalleryItem[];
};

export function Gallery({ items }: Props) {
  const { index, prevIndex, nextIndex } = useGallery(items.length);
  const item = items[index];

  return (
    <>
      {item.type === "image" && <Image key={item.source.url} url={item.source.url} />}
      {item.type === "playable" && (
        <Playable key={item.source.url} url={item.source.url} poster={item.preview.url} />
      )}
      {items.length > 1 && (
        <>
          {index > 0 && <ArrowBtn direction="left" onClick={prevIndex} />}
          <div className={style.gallery_position}>
            {index + 1} / {items.length}
          </div>
          {index < items.length - 1 && <ArrowBtn direction="right" onClick={nextIndex} />}
        </>
      )}
    </>
  );
}
