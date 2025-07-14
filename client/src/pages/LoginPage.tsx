import { css } from "@acab/ecsstatic";

const login = css`
  text-align: center;
  height: 45vh;
  align-content: end;

  & > button {
    display: block;
    margin-inline: auto;
    margin-bottom: var(--space-5);
    border-radius: var(--rounded-lg);
    background-color: var(--btn-bg);
    width: var(--space-40);
    height: var(--space-10);
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
