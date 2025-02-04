import FileImage from "@src/svg/file-image.svg?react";
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
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (isError) throw "Preview Error";

  return (
    <div className={style.preview} onClick={onClick}>
      <img
        src={url}
        onLoad={() => setLoading(false)}
        onError={() => {
          setIsError(true);
          setLoading(false);
        }}
        alt="Reddit Content"
      />
      {!loading && playable && (
        <button className={style.play_btn}>
          <Play />
        </button>
      )}
      {loading && (
        <div className={style.loading}>
          <FileImage />
        </div>
      )}
      {galleryLength > 1 && <div className={style.gallery_length}>{galleryLength}</div>}
    </div>
  );
}
