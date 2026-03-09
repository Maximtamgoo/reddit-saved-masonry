import styles from "./Profile.module.css";
import { useUser, useSignOut } from "@src/services/queries";
import Link from "@src/components/Link";
import { cn } from "@src/utils/cn";

export function Profile() {
  const user = useUser().data;
  const { mutate } = useSignOut();

  if (!user) return null;

  return (
    <div className={styles.profile}>
      <Link className={styles.link} href={`https://www.reddit.com/user/${user.name}/saved`}>
        {user.icon_img && <img className="btn" src={user.icon_img} />}
        {user.name}
      </Link>
      <button className={cn("btn", styles.signOut)} onClick={() => mutate()}>
        Sign Out
      </button>
    </div>
  );
}
