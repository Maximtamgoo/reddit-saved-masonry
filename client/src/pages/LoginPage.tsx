import { signInRedirect } from "@src/services/auth";
import styles from "./LoginPage.module.css";
import { Bookmark } from "lucide-react";
import { useRef, type SubmitEvent } from "react";
import { useTryToken } from "@src/services/queries";

export default function LoginPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useTryToken();

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (value && value !== "") mutate(value);
  }

  return (
    <main className={styles.login}>
      <div className={styles.title}>
        <Bookmark />
        Reddit Saved Masonry
      </div>
      <p>View your saved Reddit posts in a masonry grid.</p>
      <button className="btn" onClick={() => signInRedirect()}>
        Sign in with Reddit
      </button>
      <p>- or -</p>
      <form className={styles.token} onSubmit={onSubmit}>
        <input ref={inputRef} type="text" autoComplete="off" name="token" />
        <button className="btn" type="submit">
          Sign in with token
        </button>
      </form>
    </main>
  );
}
