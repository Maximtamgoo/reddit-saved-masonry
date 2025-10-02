import type { PropsWithChildren } from "react";
import styles from "./Card.module.css";

export default function Text({ children }: PropsWithChildren) {
  return <div className={styles.text}>{children}</div>;
}
