import styles from "./Gallery.module.css";
import { useGallery } from "@src/hooks/useGallery";
import { type GalleryItem } from "@src/schema/RedditItem";
import ArrowBtn from "../Modal/ArrowBtn";
import Item from "./Item";
import { cn } from "@src/utils/cn";

type Props = {
  items: GalleryItem[];
};

export default function Gallery({ items }: Props) {
  const length = items.length;
  const { index, prevIndex, nextIndex } = useGallery(length);
  const arrow_btn = cn("modal_btn", styles.arrow);

  return (
    <>
      {items.map((item) => (
        <Item key={item.id} item={item} isVisible={items[index].id === item.id} />
      ))}
      {length > 1 && (
        <>
          {index > 0 && <ArrowBtn className={arrow_btn} direction="left" onClick={prevIndex} />}
          <div className={cn("modal_btn", styles.itemNav)}>
            {index + 1} / {length}
          </div>
          {index < length - 1 && (
            <ArrowBtn className={arrow_btn} direction="right" onClick={nextIndex} />
          )}
        </>
      )}
    </>
  );
}
