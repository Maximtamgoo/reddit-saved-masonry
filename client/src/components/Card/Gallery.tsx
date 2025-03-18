import { useGallery } from "@src/hooks/useGallery";
import { type GalleryItem } from "@src/schema/RedditItem";
import { cn } from "@src/utils/cn";
import style from "./Gallery.module.css";
import Image from "./Image";
import Playable from "./Playable";

type Props = {
  items: GalleryItem[];
};

export default function Gallery({ items }: Props) {
  const galleryLength = items.length;
  const { index, prevIndex, nextIndex } = useGallery(galleryLength);
  const item = items[index];
  const src = item.preview.url;

  return (
    <div className={style.gallery}>
      {item.type === "image" && <Image key={item.id} src={src} />}
      {item.type === "playable" && <Playable key={item.id} src={item.source.url} poster={src} />}
      {galleryLength > 1 && (
        <div className={cn(style.actions, "bg-slate-0")}>
          <button
            className={cn(style.gallery_btn, "bg-slate-2 hover:bg-slate-3")}
            onClick={prevIndex}
          >
            L
          </button>

          <div className={cn(style.gallery_btn, style.item_num, "bg-slate-2")}>
            {index + 1} / {galleryLength}
          </div>

          <button
            className={cn(style.gallery_btn, "bg-slate-2 hover:bg-slate-3")}
            onClick={nextIndex}
          >
            R
          </button>
        </div>
      )}
    </div>
  );
}
