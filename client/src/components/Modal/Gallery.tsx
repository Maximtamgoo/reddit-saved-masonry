import { useGallery } from "@src/hooks/useGallery";
import { type GalleryItem } from "@src/schema/RedditItem";
import ArrowBtn from "../Modal/ArrowBtn";
import { css } from "@acab/ecsstatic";
import Item from "./Item";
import { cn } from "@src/utils/cn";

const gallery = css`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  inset: 0;
  user-select: none;
`;

const item_nav = css`
  bottom: 20px;
  left: 50%;
  translate: -50%;
  padding-inline: var(--space-4);
  width: auto;
  font-weight: 600;
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
  const item = items[index];
  const arrow_btn = cn("modal_btn", arrow);

  return (
    <div className={gallery}>
      <Item key={item.id} item={item} />
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
    </div>
  );
}
