import { useGallery } from "@src/hooks/useGallery";
import { type GalleryItem } from "@src/schema/RedditItem";
import ArrowBtn from "../Modal/ArrowBtn";
import { css } from "@acab/ecsstatic";
import Item from "./Item";
import { cn } from "@src/utils/cn";

const item_nav = css`
  top: 20px;
  right: 80px;
  padding-inline: var(--space-4);
  width: auto;
  font-weight: 600;
  &:hover {
    background-color: var(--c-zinc-900);
  }
`;

const arrow = css`
  top: 50%;
  translate: 0 -50%;
  &[data-arrow="left"] {
    left: 20px;
  }
  &[data-arrow="right"] {
    right: 20px;
    rotate: 180deg;
  }
`;

type Props = {
  items: GalleryItem[];
};

export default function Gallery({ items }: Props) {
  const length = items.length;
  const { index, prevIndex, nextIndex } = useGallery(length);
  const arrow_btn = cn("modal_btn", arrow);

  return (
    <>
      {items.map((item) => (
        <Item key={item.id} item={item} isVisible={items[index].id === item.id} />
      ))}
      {length > 1 && (
        <>
          {index > 0 && <ArrowBtn className={arrow_btn} direction="left" onClick={prevIndex} />}
          <div className={cn("modal_btn", item_nav)}>
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
