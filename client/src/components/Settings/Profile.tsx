import { css } from "@acab/ecsstatic";
import { useSignOut } from "@src/services/queries";
import Link from "@src/components/Link";
import { cn } from "@src/utils/cn";

const profile = css`
  display: flex;
  gap: var(--space-2);
  align-items: center;
  min-width: 0;
  & > a {
    flex-grow: 1;
    color: var(--fg);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const profile_pic = css`
  overflow: hidden;
`;

const sign_out = css`
  width: fit-content;
  border-radius: var(--rounded-md);
  padding: 0 var(--space-3);
`;

type Props = {
  data: {
    name: string;
    icon_img: string;
  };
};

export function Profile({ data }: Props) {
  const { mutate } = useSignOut();

  return (
    <div className={profile}>
      <div className={cn("btn", profile_pic)}>{data.icon_img && <img src={data.icon_img} />}</div>
      <Link className="truncate" href={`https://www.reddit.com/user/${data.name}/saved`}>
        {data.name}
      </Link>
      <button className={cn("btn", sign_out)} onClick={() => mutate()}>
        Sign Out
      </button>
    </div>
  );
}
