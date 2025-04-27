import { useState } from "react";
import { css } from "@acab/ecsstatic";
import Play from "@src/svg/play.svg?react";

const preview = css`
  display: grid;
  position: relative;
  grid-template-rows: minmax(0, 1fr);
  place-items: center;
  min-height: 0px;
  border-bottom-right-radius: var(--rounded-lg);
  border-bottom-left-radius: var(--rounded-lg);
  outline-offset: -1px;
`;

const play_btn = css`
  display: grid;
  position: absolute;
  place-items: center;
  width: var(--space-10);
  height: var(--space-10);
  border-radius: var(--rounded-full);
  color: var(--c-white);
  background-color: rgba(0, 0, 0, 0.75);
  outline: 1px solid var(--c-white);
`;

const gallery = css`
  display: grid;
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  place-items: center;
  border-radius: var(--rounded-lg);
  background-color: rgba(0, 0, 0, 0.75);
  outline: 1px solid var(--c-white);
  min-width: var(--space-8);
  height: var(--space-8);
  color: var(--c-white);
  font-weight: 600;
`;

type Props = {
  url: string;
  playable: boolean;
  galleryLength: number;
  onClick: () => void;
};

export default function Preview({ url, playable = false, galleryLength = 0, onClick }: Props) {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <div className="unknown">?</div>;
  }

  return (
    <button className={preview} onClick={onClick}>
      {/* <img
        role="presentation"
        className="absolute size-full object-cover blur-xl brightness-60"
        src={url}
      /> */}
      <img src={url} onError={() => setIsError(true)} alt="Reddit Content" />
      {playable && (
        <button className={play_btn}>
          <Play />
        </button>
      )}
      {galleryLength > 1 && <div className={gallery}>{galleryLength}</div>}
    </button>
  );
}
