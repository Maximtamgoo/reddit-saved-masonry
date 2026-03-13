import { useState } from "react";
import styles from "./Preview.module.css";
import FileImage from "@src/svg/file-image.svg?react";
import Play from "@src/svg/play.svg?react";
import Unknown from "./Unknown";

type Props = {
  url: string;
  isPlayable: boolean;
  galleryLength: number;
};

export default function Preview({ url, isPlayable, galleryLength }: Props) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) return <Unknown />;

  return (
    <div className={styles.preview}>
      {galleryLength > 1 && <div className={styles.gallery_length}>{galleryLength}</div>}
      {!isLoading && isPlayable && (
        <div className={styles.play}>
          <Play />
        </div>
      )}
      {isLoading && <FileImage className={styles.loader} />}
      <img
        style={{ visibility: isLoading ? "hidden" : "visible" }}
        src={url}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsError(true)}
        alt="Reddit Content"
      />
    </div>
  );
}
