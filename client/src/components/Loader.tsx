import { memo } from "react";
import { css } from "@acab/ecsstatic";
import LoaderCircle from "@src/svg/loader-circle.svg?react";
import Rotate from "@src/svg/rotate-ccw.svg?react";

const loader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
  height: var(--space-24);
  font-size: var(--text-2xl);
  color: var(--fg);
`;

const spin = css`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 1s linear infinite;
`;

const retry = css`
  display: grid;
  place-items: center;
  gap: 5px;
  border-radius: 2em;
  color: var(--fg);
  background-color: var(--btn-bg);
  width: 40px;
  height: 40px;
  &:hover {
    background-color: var(--btn-hover);
  }
`;

const flipSvg = css`
  transform: scale(-1, 1);
`;

type Props = { isError?: boolean; isEnd?: boolean; endMessage?: string; onClick?: () => void };

export default memo(function Loader({
  isError = false,
  isEnd = false,
  endMessage = "",
  onClick,
}: Props) {
  if (isEnd) {
    return <div className={loader}>{endMessage}</div>;
  }

  return (
    <div className={loader}>
      {isError ? "Could not get posts" : "Getting Posts"}
      {isError ? (
        <button className={retry} onClick={onClick}>
          <Rotate className={flipSvg} />
        </button>
      ) : (
        <LoaderCircle className={spin} width={40} height={40} />
      )}
    </div>
  );
});
