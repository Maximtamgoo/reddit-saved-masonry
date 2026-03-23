import styles from "./GalleryDialog.module.css";
import XSvg from "@src/svg/x.svg?react";
import LinkSvg from "@src/svg/link.svg?react";
import { useEffect } from "react";
import { useGalleryStore } from "@src/store/gallery";
import Item from "./Item";
import ArrowBtn from "./ArrowBtn";
import Link from "../Link";
import { cn } from "@src/utils/cn";
import { Dialog } from "../Dialog";

export function GalleryDialog() {
  const { isOpen, redditItem: item, index, galleryItems } = useGalleryStore();
  const { close, prevIndex, nextIndex } = useGalleryStore((s) => s.actions);

  const len = galleryItems.length;

  useEffect(() => {
    if (len > 1) {
      function handleArrowKey(e: KeyboardEvent) {
        if (e.code === "ArrowLeft") prevIndex();
        if (e.code === "ArrowRight") nextIndex();
      }
      window.addEventListener("keydown", handleArrowKey);
      return () => window.removeEventListener("keydown", handleArrowKey);
    }
  }, [len, prevIndex, nextIndex]);

  if (!item) return null;

  const arrow_btn = cn("btn", styles.arrow);

  return (
    <Dialog isOpen={isOpen} onClose={() => close()}>
      <Dialog.Content className={styles.gallery}>
        <Dialog.Close className={cn("btn", styles.close)}>
          <XSvg />
        </Dialog.Close>
        <Link
          className={cn("btn", styles.link)}
          href={`https://www.reddit.com${item.permalink}`}
          onClick={(e) => e.stopPropagation()}
        >
          <LinkSvg />
        </Link>
        {galleryItems.map((item) => (
          <Item key={item.id} item={item} isVisible={galleryItems[index].id === item.id} />
        ))}
        {len > 1 && (
          <>
            <ArrowBtn
              className={arrow_btn}
              disabled={index === 0}
              direction="left"
              onClick={(e) => {
                e.stopPropagation();
                prevIndex();
              }}
            />
            <div className={cn(styles.item_count)}>
              {index + 1} / {len}
            </div>
            <ArrowBtn
              className={arrow_btn}
              disabled={index === len - 1}
              direction="right"
              onClick={(e) => {
                e.stopPropagation();
                nextIndex();
              }}
            />
          </>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
