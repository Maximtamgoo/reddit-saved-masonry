import { useEffect, useRef, useState } from "react";
import style from "./GalleryModal.module.css";

type Props = {
  url: string;
  poster: string;
};

export default function Playable({ url, poster }: Props) {
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function onChange() {
      if (document.hidden && videoRef.current) videoRef.current.pause();
    }
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return (
    <div className={style.media}>
      {isError ? (
        <div className="text-8xl text-white">?</div>
      ) : (
        <video
          ref={videoRef}
          src={url}
          poster={poster}
          autoPlay={true}
          loop={true}
          controls={true}
          onClick={(e) => e.stopPropagation()}
          onError={() => {
            setIsError(true);
          }}
        ></video>
      )}
    </div>
  );
}
