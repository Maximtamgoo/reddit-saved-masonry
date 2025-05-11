import { css } from "@acab/ecsstatic";
import { useState } from "react";
import Play from "@src/svg/play.svg?react";
import Unknown from "./Unknown";

const preview = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const play_btn = css`
  display: grid;
  position: absolute;
  place-items: center;
  outline: 1px solid var(--c-white);
  border-radius: var(--rounded-full);
  background-color: rgba(0, 0, 0, 0.75);
  width: var(--space-10);
  height: var(--space-10);
  color: var(--c-white);
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
  isPlayable: boolean;
  galleryLength: number;
};

export default function Preview({ url, isPlayable, galleryLength }: Props) {
  const [isError, setIsError] = useState(false);
  if (isError) return <Unknown />;
  return (
    <div className={preview}>
      {galleryLength > 1 && <div className={gallery}>{galleryLength}</div>}
      {isPlayable && (
        <div className={play_btn}>
          <Play />
        </div>
      )}
      <img src={url} onError={() => setIsError(true)} alt="Reddit Content" />
    </div>
  );
}
