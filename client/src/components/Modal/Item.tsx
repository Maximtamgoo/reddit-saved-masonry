import type { GalleryItem } from "@src/schema/RedditItem";
import { useState } from "react";
import Unknown from "../Card/Unknown";
import Playable from "./Playable";

export default function Item({ item }: { item: GalleryItem }) {
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
          onError={() => setIsError(true)}
          alt="Reddit Content"
        />
      )}
      {isPlayable && (
        <Playable
          key={item.id}
          src={item.source.url}
          poster={item.preview.url}
          onError={() => setIsError(true)}
        />
      )}
    </>
  );
}
