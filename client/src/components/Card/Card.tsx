import { css } from "@acab/ecsstatic";
import { memo } from "react";
import { RedditItem } from "@src/schema/RedditItem";
import Details from "./Details";
import Text from "./Text";
import Dialog from "../Modal/Dialog";
import Preview from "./Preview";
import Link from "../Link";
import ArrowLeft from "@src/svg/arrow-left.svg?react";
import LinkSvg from "@src/svg/link.svg?react";
import Gallery from "../Modal/Gallery";
import Unknown from "./Unknown";
import { cn } from "@src/utils/cn";

const card = css`
  container: card / inline-size;
  display: grid;
  grid-template-rows: auto 1fr;
  outline: 1px solid var(--ring-color);
  border-radius: var(--rounded-xl);
  background-color: var(--card-bg);
  height: 100%;
`;

const link_svg = css`
  top: 20px;
  right: 20px;
`;

const close = css`
  top: 20px;
  left: 20px;
`;

const trigger = css`
  min-height: 0px;
  z-index: 10;
  outline-offset: 1px;
  border-radius: 0 0 var(--rounded-xl) var(--rounded-xl);
  overflow: hidden;
`;

type Props = {
  item: RedditItem;
};

export default memo(function Card({ item }: Props) {
  const isText = item.type === "text" || item.type === "comment";
  const isUnknown = item.type === "unknown";
  const isGallery = item.type === "gallery";
  const galleryLength = isGallery ? item.gallery.length : 0;
  const isPlayable = item.type === "playable";
  const isFirstGalleryItemPlayable = isGallery && item.gallery[0].type === "playable";
  const isImage = item.type === "image";
  const isMedia = isImage || isPlayable || isGallery;
  const galleryItems = isGallery ? item.gallery : isImage || isPlayable ? [item] : [];

  return (
    <section className={card}>
      <Details item={item} />
      <Dialog>
        {isText && <Text>{item.text}</Text>}
        {isUnknown && <Unknown />}
        {isMedia && (
          <Dialog.Trigger className={trigger}>
            <Preview
              url={item.preview.url}
              isPlayable={isPlayable || isFirstGalleryItemPlayable}
              galleryLength={galleryLength}
            />
          </Dialog.Trigger>
        )}
        <Dialog.Content>
          <Dialog.Close className={cn("modal_btn", close)}>
            <ArrowLeft />
          </Dialog.Close>
          <Link
            className={cn("modal_btn", link_svg)}
            href={`https://www.reddit.com${item.permalink}`}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkSvg />
          </Link>
          <Gallery items={galleryItems} />
        </Dialog.Content>
      </Dialog>
    </section>
  );
});
