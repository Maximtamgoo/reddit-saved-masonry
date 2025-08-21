import { css } from "@acab/ecsstatic";
import { MaxCardSize } from "./MaxCardSize";
import { Profile } from "./Profile";
import { MaxColumns } from "./MaxColumns";
import { Theme } from "./Theme";
import { useGetUserData } from "@src/services/queries";
import { Dialog } from "../Dialog";
import SettingsSvg from "@src/svg/settings.svg?react";
import X from "@src/svg/x.svg?react";

const settings = css`
  display: grid;
  gap: var(--space-7);
  width: 300px;
`;

const dialog = css`
  display: grid;
  inset: 0;
  gap: var(--space-2);
  margin: auto;
  border: 1px solid var(--ring-color);
  border-radius: var(--rounded-lg);
  background-color: var(--bg);
  padding: var(--space-4);
  &::backdrop {
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const top = css`
  display: flex;
  gap: var(--space-4);
`;

const title = css`
  flex-grow: 1;
  font-size: var(--text-3xl);
  align-content: center;
`;

const close = css`
  display: grid;
  flex-shrink: 0;
  gap: var(--space-1);
  & > span {
    place-self: center;
    border: 2px solid var(--ring-color);
    border-radius: var(--rounded);
    width: var(--space-8);
    font-weight: 500;
    font-size: var(--text-xs);
    user-select: none;
    text-align: center;
  }
`;

// const divider = css`
//   border: 1px solid var(--btn-bg);
//   border-radius: var(--rounded);
// `;

export function Settings() {
  const data = useGetUserData();
  return (
    <Dialog>
      <Dialog.Trigger className="btn">
        <SettingsSvg />
      </Dialog.Trigger>
      <Dialog.Content className={dialog}>
        <div className={top}>
          <div className={title}>Settings</div>
          <div className={close}>
            <Dialog.Close className="btn">
              <X />
            </Dialog.Close>
            <span>ESC</span>
          </div>
        </div>
        <div className={settings}>
          <Theme />
          {/* <hr className={divider} /> */}
          {data && <MaxColumns />}
          {/* <hr className={divider} /> */}
          {data && <MaxCardSize />}
          {/* <hr className={divider} /> */}
          {data && <Profile data={data} />}
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
