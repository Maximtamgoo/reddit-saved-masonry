import styles from "./Profile.module.css";
import { useGetUserData, useSignOut } from "@src/services/queries";
import Link from "@src/components/Link";
import { cn } from "@src/utils/cn";

export function Profile() {
  const data = useGetUserData();
  const { mutate } = useSignOut();

  if (!data) return null;

  return (
    <div className={styles.profile}>
      <Link className={styles.link} href={`https://www.reddit.com/user/${data.name}/saved`}>
        {data.icon_img && <img className="btn" src={data.icon_img} />}
        {data.name}
      </Link>
      <button className={cn("btn", styles.signOut)} onClick={() => mutate()}>
        Sign Out
      </button>
    </div>
  );
}
