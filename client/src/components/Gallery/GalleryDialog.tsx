import styles from "./GalleryDialog.module.css";
import XSvg from "@src/svg/x.svg?react";
import LinkSvg from "@src/svg/link.svg?react";
import { useEffect, useRef } from "react";
import { useGalleryStore } from "@src/store/gallery";
import Item from "./Item";
import ArrowBtn from "./ArrowBtn";
import Link from "../Link";
import { cn } from "@src/utils/cn";

export function GalleryDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const { isOpen, redditItem: item, index, galleryItems } = useGalleryStore();
  const { close, prevIndex, nextIndex } = useGalleryStore((s) => s.actions);

  const len = galleryItems.length;

  useEffect(() => {
    if (isOpen) ref.current?.showModal();
  }, [isOpen]);

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

  if (!isOpen) return null;

  const arrow_btn = cn("btn", styles.arrow);

  return (
    <dialog ref={ref} className={styles.gallery} closedby="any" onClose={() => close()}>
      <Link className={cn("btn", styles.link)} href={`https://www.reddit.com${item.permalink}`}>
        <LinkSvg />
      </Link>
      <button onClick={() => close()} className={cn("btn", styles.close)}>
        <XSvg />
      </button>
      {galleryItems.map((item) => (
        <Item key={item.id} item={item} isVisible={galleryItems[index].id === item.id} />
      ))}
      {len > 1 && (
        <>
          <ArrowBtn
            className={arrow_btn}
            disabled={index === 0}
            direction="left"
            onClick={prevIndex}
          />
          <div className={cn(styles.item_count)}>
            {index + 1} / {len}
          </div>

          <ArrowBtn
            className={arrow_btn}
            disabled={index === len - 1}
            direction="right"
            onClick={nextIndex}
          />
        </>
      )}
    </dialog>
  );
}
