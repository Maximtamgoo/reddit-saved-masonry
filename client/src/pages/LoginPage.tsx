import { css } from "@acab/ecsstatic";

const login = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  text-align: center;
  position: absolute;
  inset: 0;
  & > button {
    border-radius: var(--rounded-lg);
    background-color: var(--btn-bg);
    padding: var(--space-2) var(--space-3);
    min-height: var(--space-10);
    &:hover {
      background-color: var(--btn-hover);
    }
  }
`;

export default function LoginPage() {
  return (
    <main className={login}>
      <button onClick={() => (window.location.href = "/api/authurl")}>Sign in with Reddit</button>
      View your saved Reddit posts in a masonry grid.
    </main>
  );
}
