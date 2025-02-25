import style from "./Card.module.css";

type Props = {
  text: string;
};

export default function Text({ text }: Props) {
  return <div className={style.text}>{text}</div>;
}
