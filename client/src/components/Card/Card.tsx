import { memo } from "react";
import styles from "./Card.module.css";
import { RedditItem } from "@src/schema/RedditItem";
import Details from "./Details";
import Text from "./Text";
import Preview from "./Preview";
import Unknown from "./Unknown";
import { useSettingsStore } from "@src/store/settings";
import { calculateAspectRatioFit } from "@src/utils/calculateAspectRatioFit";
import { useGalleryStore } from "@src/store/gallery";

type Props = {
  item: RedditItem;
  itemWidth: number;
  itemHeight: number;
};

const { MIN_CARD_SIZE } = useSettingsStore.getInitialState();

export default memo(function Card({ item, itemWidth, itemHeight }: Props) {
  const openDialog = useGalleryStore((s) => s.actions.open);
  const isText = item.type === "text" || item.type === "comment";
  const isUnknown = item.type === "unknown";
  const isGallery = item.type === "gallery";
  const galleryLength = isGallery ? item.gallery.length : 0;
  const isPlayable = item.type === "playable";
  const isFirstGalleryItemPlayable = isGallery && item.gallery[0].type === "playable";
  const isImage = item.type === "image";
  const isMedia = isImage || isPlayable || isGallery;

  const detailsHeight = 100;
  let totalHeight = detailsHeight;
  if (isMedia) {
    const p = item.preview;
    totalHeight += calculateAspectRatioFit(p.width, p.height, itemWidth, p.height).height;
  }
  const cardHeight = Math.max(MIN_CARD_SIZE, Math.min(itemHeight, Math.floor(totalHeight)));

  return (
    <div className={styles.card} style={{ height: cardHeight + "px" }}>
      <Details item={item} />
      {isText && <Text>{item.text}</Text>}
      {isUnknown && <Unknown />}
      {isMedia && (
        <button onClick={() => openDialog(item)} className={styles.trigger}>
          <Preview
            url={item.preview.url}
            isPlayable={isPlayable || isFirstGalleryItemPlayable}
            galleryLength={galleryLength}
          />
        </button>
      )}
    </div>
  );
});
