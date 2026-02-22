import styles from "./GalleryDialog.module.css";
// import XSvg from "@src/svg/x.svg?react";
import { useEffect, useRef } from "react";
import { useGalleryStore } from "@src/store/gallery";
import Item from "./Item";
import ArrowBtn from "./ArrowBtn";
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

  const arrow_btn = cn("modal_btn", styles.arrow);

  if (!isOpen) return null;

  return (
    <dialog ref={ref} className={styles.gallery} closedby="any" onClose={() => close()}>
      {galleryItems.map((item) => (
        <Item key={item.id} item={item} isVisible={galleryItems[index].id === item.id} />
      ))}
      {len > 1 && (
        <>
          {index > 0 && <ArrowBtn className={arrow_btn} direction="left" onClick={prevIndex} />}
          <div className={cn("modal_btn", styles.itemNav)}>
            {index + 1} / {len}
          </div>
          {index < len - 1 && (
            <ArrowBtn className={arrow_btn} direction="right" onClick={nextIndex} />
          )}
        </>
      )}
    </dialog>
  );
}
