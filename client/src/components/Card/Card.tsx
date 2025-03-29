import { RedditItem } from "@src/schema/RedditItem";
import { memo, useState } from "react";
import Dialog from "../Modal/Dialog";
import Modal from "../Modal/Modal";
import style from "./Card.module.css";
import Details from "./Details";
import Preview from "./Preview";
import Text from "./Text";

type Props = {
  item: RedditItem;
};

export default memo(function Card({ item }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={style.card}>
      <Details item={item} />
      {(item.type === "text" || item.type === "comment") && <Text text={item.text} />}
      {(item.type === "image" || item.type === "playable" || item.type === "gallery") && (
        <>
          <Preview
            url={item.preview.url}
            playable={item.type === "playable"}
            galleryLength={item.type === "gallery" ? item.gallery.length : 0}
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <Dialog onClose={() => setIsOpen(false)}>
              <Modal item={item} />
            </Dialog>
          )}
        </>
      )}
      {item.type === "unknown" && <div className={style.unknown}>?</div>}
    </section>
  );
});
