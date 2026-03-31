import { memo } from "react";
import { LoaderCircle, RefreshCw } from "lucide-react";
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
        <button className="btn" onClick={props.onClick}>
          <RefreshCw />
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
