import Play from "@src/svg/play.svg?react";
import { useEffect, useRef, useState } from "react";
import style from "./Playble.module.css";

type Props = {
  src: string;
  poster: string;
};

export default function Playable({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);
  const [enabled, setEnabled] = useState(false);

  function firstPlay() {
    if (!videoRef.current) return;
    videoRef.current.play();
    setEnabled(true);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (enabled && video) {
      const observer = new IntersectionObserver(([e]) => !e.isIntersecting && video.pause());
      observer.observe(video);
      const onChange = () => document.hidden && video.pause();
      document.addEventListener("visibilitychange", onChange);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", onChange);
      };
    }
  }, [enabled]);

  if (isError) {
    return <div className={style.playable}>A video should be here...</div>;
  }

  return (
    <div className={style.playable}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={true}
        controls={enabled}
        onError={() => setIsError(true)}
      />
      {!enabled && (
        <div className={style.click_layer} onClick={firstPlay}>
          <button className={style.play_btn}>
            <Play />
          </button>
        </div>
      )}
    </div>
  );
}
