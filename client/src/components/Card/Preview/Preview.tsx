import Play from "@src/svg/play.svg?react";
import { useState } from "react";
import style from "./Preview.module.css";

type Props = {
  url: string;
  playable: boolean;
  galleryLength: number;
  onClick: () => void;
};

export default function Preview({ url, playable = false, galleryLength = 0, onClick }: Props) {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <div className={style.preview}>?</div>;
  }

  return (
    <div className={style.preview} onClick={onClick}>
      <img src={url} onError={() => setIsError(true)} alt="Reddit Content" />
      {playable && (
        <button className={style.play_btn}>
          <Play />
        </button>
      )}
      {galleryLength > 1 && <div className={style.gallery_length}>{galleryLength}</div>}
    </div>
  );
}
