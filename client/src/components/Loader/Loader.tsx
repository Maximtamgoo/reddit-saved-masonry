import { memo } from "react";
import LoaderCircle from "@src/svg/loader-circle.svg?react";
import Rotate from "@src/svg/rotate-ccw.svg?react";
import styles from "./Loader.module.css";

type IsLoading = {
  state: "loading";
};

type IsError = {
  state: "error";
  onClick: () => void;
};

type IsEnd = {
  state: "end";
  endMsg: string;
};

type Props = IsLoading | IsError | IsEnd;

export default memo(function Loader(props: Props) {
  if (props.state === "error") {
    return (
      <div className={styles.loader}>
        Could not get posts
        <button className={styles.retry} onClick={props.onClick}>
          <Rotate />
        </button>
      </div>
    );
  }

  if (props.state === "end") {
    return <div className={styles.loader}>{props.endMsg}</div>;
  }

  return (
    <div className={styles.loader}>
      Getting Posts <LoaderCircle className={styles.spin} />
    </div>
  );
});
