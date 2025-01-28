import { useState } from "react";
import style from "./Modal.module.css";

type Props = {
  url: string;
};

export default function Image({ url }: Props) {
  const [isError, setIsError] = useState(false);

  return (
    <div className={style.media}>
      {isError ? (
        <div className="text-8xl text-white">?</div>
      ) : (
        <img
          src={url}
          onClick={(e) => e.stopPropagation()}
          onError={() => setIsError(true)}
          alt="Reddit Content"
        />
      )}
    </div>
  );
}
