import style from "./Image.module.css";

type Props = {
  src: string;
};

export default function Image({ src }: Props) {
  // const [isError, setIsError] = useState(false);

  const alt = "An image should be here...";

  // if (isError) {
  //   return <div className={style.image}>{alt}</div>;
  // }

  return (
    <div className={style.image}>
      <img src={src} alt={alt} />
    </div>
  );
}
