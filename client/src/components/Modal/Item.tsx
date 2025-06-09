import type { GalleryItem } from "@src/schema/RedditItem";
import { memo, useState } from "react";
import Unknown from "../Card/Unknown";
import Playable from "./Playable";

type Props = {
  item: GalleryItem;
  isVisible: boolean;
};

export default memo(function Item({ item, isVisible }: Props) {
  const [isError, setIsError] = useState(false);
  const isPlayable = item.type === "playable";
  const isImage = item.type === "image";

  if (isError) return <Unknown />;

  return (
    <>
      {isImage && (
        <img
          key={item.id}
          src={item.preview.url}
          alt="Reddit Content"
          onError={() => setIsError(true)}
          style={{ display: isVisible ? "block" : "none" }}
        />
      )}
      {isPlayable && (
        <Playable
          key={item.id}
          src={item.source.url}
          poster={item.preview.url}
          onError={() => setIsError(true)}
          style={{ display: isVisible ? "block" : "none" }}
        />
      )}
    </>
  );
});
