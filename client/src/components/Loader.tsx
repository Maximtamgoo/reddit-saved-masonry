import { memo } from "react";
import { css } from "@acab/ecsstatic";
import LoaderCircle from "@src/svg/loader-circle.svg?react";
import RotateCw from "@src/svg/rotate-cw.svg?react";

const loader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 60px;
  font-size: x-large;
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
  background-color: lightgray;
  width: 40px;
  height: 40px;
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
          <RotateCw />
        </button>
      ) : (
        <LoaderCircle className={spin} width={40} height={40} />
      )}
    </div>
  );
});
