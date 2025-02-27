import { useGallery } from "@src/hooks/useGallery";
import { GalleryItem } from "@src/schema/RedditItem";
import { cn } from "@src/utils/cn";
import { useState } from "react";
import ArrowBtn from "./ArrowBtn";
import style from "./Modal.module.css";
import Playable from "./Playable";

type Props = {
  items: GalleryItem[];
};

export default function Gallery({ items }: Props) {
  const [isError, setIsError] = useState(false);
  const galleryLength = items.length;
  const { index, prevIndex, nextIndex } = useGallery(galleryLength);
  const item = items[index];
  const src = item.preview.url;

  return (
    <>
      {isError ? (
        <div className={style.error}>?</div>
      ) : (
        <>
          {item.type === "image" && (
            <img key={item.id} src={src} onError={() => setIsError(true)} alt="Reddit Content" />
          )}
          {item.type === "playable" && (
            <Playable
              key={item.id}
              src={item.source.url}
              poster={src}
              onError={() => setIsError(true)}
            />
          )}
        </>
      )}
      {galleryLength > 1 && (
        <>
          {index > 0 && <ArrowBtn direction="left" onClick={prevIndex} />}
          <div className={cn(style.modal_btn, style.item_num)}>
            {index + 1} / {galleryLength}
          </div>
          {index < galleryLength - 1 && <ArrowBtn direction="right" onClick={nextIndex} />}
        </>
      )}
    </>
  );
}
