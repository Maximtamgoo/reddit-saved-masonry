import { memo } from "react";
import LoaderCircle from "@src/svg/loader-circle.svg?react";
import Rotate from "@src/svg/rotate-ccw.svg?react";
import styles from "./Loader.module.css";

type Props = { isError?: boolean; isEnd?: boolean; endMessage?: string; onClick?: () => void };

export default memo(function Loader({
  isError = false,
  isEnd = false,
  endMessage = "",
  onClick,
}: Props) {
  if (isEnd) {
    return <div className={styles.loader}>{endMessage}</div>;
  }

  return (
    <div className={styles.loader}>
      {isError ? "Could not get posts" : "Getting Posts"}
      {isError ? (
        <button className={styles.retry} onClick={onClick}>
          <Rotate />
        </button>
      ) : (
        <LoaderCircle className={styles.spin} width={40} height={40} />
      )}
    </div>
  );
});
