import type { ComponentProps } from "react";

type Props = {
  src: string;
  poster: string;
  onError: () => void;
};

function pauseOnHidden(node: HTMLVideoElement) {
  const onChange = () => document.hidden && node.pause();
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export default function Playable({ src, poster, onError }: Props & ComponentProps<"video">) {
  return (
    <video
      ref={pauseOnHidden}
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
