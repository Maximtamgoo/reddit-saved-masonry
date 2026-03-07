import styles from "./Profile.module.css";
import { useSession, useSignOut } from "@src/services/queries";
import Link from "@src/components/Link";
import { cn } from "@src/utils/cn";

export function Profile() {
  const { data } = useSession();
  const { mutate } = useSignOut();

  if (!data) return null;

  const image = data.user.image;

  return (
    <div className={styles.profile}>
      <Link className={styles.link} href={`https://www.reddit.com/user/${data.user.name}/saved`}>
        {image && <img className="btn" src={image} />}
        {data.user.name}
      </Link>
      <button className={cn("btn", styles.signOut)} onClick={() => mutate()}>
        Sign Out
      </button>
    </div>
  );
}
