import { css } from "@acab/ecsstatic";
import { memo, useState } from "react";
import { RedditItem } from "@src/schema/RedditItem";
import Dialog from "../Modal/Dialog";
import Modal from "../Modal/Modal";
import Details from "./Details";
import Preview from "./Preview";
import Text from "./Text";

const card = css`
  display: grid;
  grid-template-rows: auto 1fr;
  border: 1px solid var(--ring-color);
  border-radius: var(--rounded-lg);
  background-color: var(--card-bg);
  height: 100%;
  overflow: hidden;
`;

type Props = {
  item: RedditItem;
};

export default memo(function Card({ item }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const isText = item.type === "text" || item.type === "comment";
  const isGallery = item.type === "gallery" && item.gallery.length > 1;
  const isPlayable = item.type === "playable";
  const isMedia = item.type === "image" || isPlayable || isGallery;

  return (
    <section className={card}>
      <Details item={item} />

      {isText && <Text text={item.text} />}
      {isMedia && (
        <>
          <Preview
            url={item.preview.url}
            playable={isPlayable}
            galleryLength={isGallery ? item.gallery.length : 0}
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <Dialog onClose={() => setIsOpen(false)}>
              <Modal item={item} />
            </Dialog>
          )}
        </>
      )}
      {item.type === "unknown" && <div className="unknown">?</div>}
    </section>
  );
});
