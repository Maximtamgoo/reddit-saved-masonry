import { useState } from "react";
import styles from "./Preview.module.css";
import Play from "@src/svg/play.svg?react";
import Unknown from "./Unknown";

type Props = {
  url: string;
  isPlayable: boolean;
  galleryLength: number;
};

export default function Preview({ url, isPlayable, galleryLength }: Props) {
  const [isError, setIsError] = useState(false);
  if (isError) return <Unknown />;
  return (
    <div className={styles.preview}>
      {galleryLength > 1 && <div className={styles.gallery}>{galleryLength}</div>}
      {isPlayable && (
        <div className={styles.playBtn}>
          <Play />
        </div>
      )}
      <img src={url} onError={() => setIsError(true)} alt="Reddit Content" />
    </div>
  );
}
