import { memo, type MouseEvent } from "react";
import styles from "./Card.module.css";
import { RedditItem } from "@src/schema/RedditItem";
import Details from "./Details";
import Text from "./Text";
import Preview from "./Preview";
import Link from "../Link";
import ArrowLeft from "@src/svg/arrow-left.svg?react";
import LinkSvg from "@src/svg/link.svg?react";
import Gallery from "../Modal/Gallery";
import Unknown from "./Unknown";
import { cn } from "@src/utils/cn";
import { Dialog } from "@src/components/Dialog";
import { useSettingsStore } from "@src/store/settings";
import { calculateAspectRatioFit } from "@src/utils/calculateAspectRatioFit";

type Props = {
  item: RedditItem;
  itemWidth: number;
};

function onClickDialog(e: MouseEvent<HTMLDialogElement>) {
  if (e.target === e.currentTarget) e.currentTarget.close();
}

const { minCardSize } = useSettingsStore.getInitialState();

export default memo(function Card({ item, itemWidth }: Props) {
  const maxCardHeight = useSettingsStore((s) => s.maxCardHeight);
  const isText = item.type === "text" || item.type === "comment";
  const isUnknown = item.type === "unknown";
  const isGallery = item.type === "gallery";
  const galleryLength = isGallery ? item.gallery.length : 0;
  const isPlayable = item.type === "playable";
  const isFirstGalleryItemPlayable = isGallery && item.gallery[0].type === "playable";
  const isImage = item.type === "image";
  const isMedia = isImage || isPlayable || isGallery;
  const galleryItems = isGallery ? item.gallery : isImage || isPlayable ? [item] : [];

  const detailsHeight = 100;
  let totalHeight = detailsHeight;
  if (isMedia) {
    const p = item.preview;
    totalHeight += calculateAspectRatioFit(p.width, p.height, itemWidth, p.height).height;
  }
  const cardHeight = Math.max(minCardSize, Math.min(maxCardHeight, Math.floor(totalHeight)));

  return (
    <div
      className={styles.card}
      style={{
        height: cardHeight + "px",
        // minHeight: minCardSize + "px",
        // maxHeight: `${isMedia ? maxCardHeight : minCardSize}px`,
      }}
    >
      <Details item={item} />
      {isText && <Text>{item.text}</Text>}
      {isUnknown && <Unknown />}
      {isMedia && (
        <Dialog>
          <Dialog.Trigger className={styles.trigger}>
            <Preview
              url={item.preview.url}
              // width={item.preview.width}
              // height={item.preview.height}
              isPlayable={isPlayable || isFirstGalleryItemPlayable}
              galleryLength={galleryLength}
            />
          </Dialog.Trigger>
          <Dialog.Content onClick={onClickDialog} className={styles.dialog}>
            <Dialog.Close className={cn("modal_btn", styles.close)}>
              <ArrowLeft />
            </Dialog.Close>
            <Link
              className={cn("modal_btn", styles.linkSvg)}
              href={`https://www.reddit.com${item.permalink}`}
            >
              <LinkSvg />
            </Link>
            <Gallery items={galleryItems} />
          </Dialog.Content>
        </Dialog>
      )}
    </div>
  );
});
