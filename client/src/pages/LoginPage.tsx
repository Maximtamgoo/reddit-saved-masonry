import { css } from "@acab/ecsstatic";
import Bookmark from "@src/svg/bookmark.svg?react";

const login = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
  padding-top: 40px;
  height: 100vh;
  text-align: center;

  & > button {
    border-radius: 0.5em;
    background-color: gray;
    width: 155px;
    height: 40px;
  }

  & svg {
    display: inline-block;
    vertical-align: top;
    width: 40px;
    height: 40px;
  }
`;

const title = css`
  font-size: xx-large;
`;

export default function LoginPage() {
  return (
    <div className={login}>
      <div className={title}>
        <Bookmark />
        Reddit Saved Masonry
      </div>
      <button onClick={() => (window.location.href = "/api/authurl")}>Login with Reddit</button>
      View your saved Reddit posts in a masonry grid.
    </div>
  );
}
