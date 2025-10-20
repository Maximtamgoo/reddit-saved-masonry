import type { GalleryItem } from "@src/schema/RedditItem";
import { memo, useCallback, useState } from "react";
import Unknown from "../Card/Unknown";

type Props = {
  item: GalleryItem;
  isVisible: boolean;
};

export default memo(function Item({ item, isVisible }: Props) {
  const [isError, setIsError] = useState(false);

  const videoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      if (!node) return;
      if (isVisible) {
        node.play();
      } else {
        node.pause();
        node.currentTime = 0;
      }
    },
    [isVisible],
  );

  if (isError) return <Unknown />;

  return (
    <>
      {item.type === "image" && (
        <img
          key={item.id}
          src={item.preview.url}
          alt="Reddit Content"
          onError={() => setIsError(true)}
          style={{ display: isVisible ? "block" : "none" }}
        />
      )}
      {item.type === "playable" && (
        <video
          ref={videoRef}
          key={item.id}
          src={item.source.url}
          poster={item.preview.url}
          onError={() => setIsError(true)}
          style={{ display: isVisible ? "block" : "none" }}
          autoPlay={isVisible}
          loop={true}
          controls={true}
        />
      )}
    </>
  );
});
