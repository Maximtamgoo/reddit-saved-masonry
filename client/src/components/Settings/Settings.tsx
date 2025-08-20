import { css } from "@acab/ecsstatic";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";
import { MaxColumns } from "./MaxColumns";
import { Theme } from "./Theme";
import { useGetUserData } from "@src/services/queries";

const settings = css`
  display: grid;
  gap: var(--space-7);
  width: 300px;
`;

// const divider = css`
//   border: 1px solid var(--btn-bg);
//   border-radius: var(--rounded);
// `;

export function Settings() {
  const data = useGetUserData();
  return (
    <div className={settings}>
      <Theme />
      {/* <hr className={divider} /> */}
      {data && <MaxColumns />}
      {/* <hr className={divider} /> */}
      {data && <MaxCardSize />}
      {/* <hr className={divider} /> */}
      {data && <Profile data={data} />}
    </div>
  );
}
