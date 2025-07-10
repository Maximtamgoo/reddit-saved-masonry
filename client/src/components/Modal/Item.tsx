import type { GalleryItem } from "@src/schema/RedditItem";
import { memo, useRef, useState } from "react";
import Unknown from "../Card/Unknown";

type Props = {
  item: GalleryItem;
  isVisible: boolean;
};

export default memo(function Item({ item, isVisible }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);

  if (isError) return <Unknown />;

  if (isVisible) {
    videoRef.current?.play();
  } else {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  }

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
