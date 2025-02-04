import { RedditItem } from "@src/schema/RedditItem";
import { memo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Dialog from "../Dialog/Dialog";
import GalleryModal from "../GalleryModal/GalleryModal";
import style from "./Card.module.css";
import Details from "./Details";
import Preview from "./Preview/Preview";
import Text from "./Text";

type Props = {
  item: RedditItem;
};

function Unknown() {
  return <div className={style.unknown}>?</div>;
}

export default memo(function Card({ item }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={style.card}>
      <Details item={item} />
      <ErrorBoundary FallbackComponent={Unknown}>
        {(item.type === "text" || item.type === "comment") && <Text text={item.text} />}
        {(item.type === "gallery" || item.type === "image" || item.type === "playable") && (
          <Preview
            url={item.preview.url}
            playable={item.type === "playable"}
            galleryLength={item.type === "gallery" ? item.gallery.length : 0}
            onClick={() => setIsOpen(true)}
          />
        )}
        {item.type === "unknown" && <Unknown />}
        {isOpen && (
          <Dialog onClose={() => setIsOpen(false)}>
            <GalleryModal redditItem={item} />
          </Dialog>
        )}
      </ErrorBoundary>
    </section>
  );
});
