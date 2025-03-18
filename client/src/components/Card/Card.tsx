import { RedditItem } from "@src/schema/RedditItem";
import { memo } from "react";
// import Dialog from "../Modal/Dialog";
// import Modal from "../Modal/Modal";
import style from "./Card.module.css";
import Details from "./Details";
import Gallery from "./Gallery";
import Image from "./Image";
import Playable from "./Playable";
// import Preview from "./Preview";
import Text from "./Text";

type Props = {
  item: RedditItem;
};

export default memo(function Card({ item }: Props) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={style.card}>
      <Details item={item} />
      {(item.type === "text" || item.type === "comment") && <Text text={item.text} />}
      {/* {item.type === "image" && (
        <>
          <Preview
            url={item.preview.url}
            playable={false}
            galleryLength={0}
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <Dialog onClose={() => setIsOpen(false)}>
              <Modal item={item} />
            </Dialog>
          )}
        </>
      )} */}
      {item.type === "image" && <Image src={item.preview.url} />}
      {item.type === "playable" && <Playable src={item.source.url} poster={item.preview.url} />}
      {item.type === "gallery" && <Gallery items={item.gallery} />}
      {item.type === "unknown" && <div className={style.unknown}>?</div>}
    </section>
  );
});
