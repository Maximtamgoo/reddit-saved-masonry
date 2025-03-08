import LoaderCircle from "@src/svg/loader-circle.svg?react";
import RotateCw from "@src/svg/rotate-cw.svg?react";
import { memo } from "react";
import style from "./Loader.module.css";

type Props = { isError?: boolean; isEnd?: boolean; endMessage?: string; onClick?: () => void };

export default memo(function Loader({
  isError = false,
  isEnd = false,
  endMessage = "",
  onClick,
}: Props) {
  if (isEnd) {
    return <div className={style.loader}>{endMessage}</div>;
  }

  return (
    <div className={style.loader}>
      {isError ? "Could not get posts" : "Getting Posts"}
      {isError ? (
        <button className={style.retry} onClick={onClick}>
          <RotateCw />
        </button>
      ) : (
        <LoaderCircle className={style.spin} width={40} height={40} />
      )}
    </div>
  );
});
