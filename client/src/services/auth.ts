import { number, object, string, type Infer } from "@badrap/valita";
import HttpError from "@src/utils/HttpError";

const Session = object({
  access_token: string(),
  expires_at: number(),
});

type Session = Infer<typeof Session>;

let session: Session | null = null;

export async function getSession() {
  const expires_at = session?.expires_at ?? 0;
  const isExpired = Date.now() >= expires_at;
  if (session && !isExpired) return session;
  return (session = await refreshSession());
}

let sessionPromise: Promise<Response> | null = null;

async function refreshSession() {
  try {
    if (!sessionPromise) {
      sessionPromise = fetch("/api/auth/session", { method: "POST" });
    }
    const res = await sessionPromise;
    if (!res.ok) throw new HttpError(res.status, res.statusText);
    return Session.parse(await res.json());
  } finally {
    sessionPromise = null;
  }
}

export function signInRedirect() {
  window.location.href = "/api/auth/redirect";
}

export async function signOut() {
  const res = await fetch("/api/auth/signout", { method: "DELETE" });
  if (!res.ok) throw new HttpError(res.status, res.statusText);
}
