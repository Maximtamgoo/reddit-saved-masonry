import { css } from "@acab/ecsstatic";
import { useGetUserData, useSignOut } from "@src/services/queries";
import Link from "@src/components/Link";
import { cn } from "@src/utils/cn";

const profile = css`
  display: flex;
  gap: var(--space-2);
  min-width: 0;
  @media (width < 300px) {
    display: grid;
    & > :last-child {
      width: 100%;
    }
  }
`;

const links = css`
  display: flex;
  gap: var(--space-2);
  align-items: center;
  min-width: 0;
  flex-grow: 1;
`;

const img_link = css`
  overflow: hidden;
`;

const name_link = css`
  color: var(--fg);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const sign_out = css`
  width: fit-content;
  border-radius: var(--rounded-md);
  padding: 0 var(--space-3);
`;

export function Profile() {
  const data = useGetUserData();
  const { mutate } = useSignOut();

  if (!data) return null;

  return (
    <div className={profile}>
      <div className={links}>
        <Link
          className={cn("btn", img_link)}
          href={`https://www.reddit.com/user/${data.name}/saved`}
        >
          {data.icon_img && <img src={data.icon_img} />}
        </Link>
        <Link
          className={cn("truncate", name_link)}
          href={`https://www.reddit.com/user/${data.name}/saved`}
        >
          {data.name}
        </Link>
      </div>
      <button className={cn("btn", sign_out)} onClick={() => mutate()}>
        Sign Out
      </button>
    </div>
  );
}
