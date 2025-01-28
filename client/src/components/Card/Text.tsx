import { useLayoutEffect, useRef, useState } from "react";
import style from "./Card.module.css";

type Props = {
  text: string;
};

export default function Text({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) setLines(Math.floor(ref.current.clientHeight / 24));
  }, []);

  return (
    <div
      ref={ref}
      className={style.text}
      style={{
        WebkitLineClamp: lines,
      }}
    >
      {text}
    </div>
  );
}
