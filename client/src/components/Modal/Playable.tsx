import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  onError: () => void;
};

export default function Playable({ src, poster, onError }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function onChange() {
      if (document.hidden && videoRef.current) videoRef.current.pause();
    }
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={true}
      loop={true}
      controls={true}
      onClick={(e) => e.stopPropagation()}
      onError={onError}
    />
  );
}
