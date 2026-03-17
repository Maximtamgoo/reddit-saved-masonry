import HttpError from "@src/utils/HttpError";

export function signInRedirect() {
  window.location.href = "/api/redirect";
}

export async function signOut() {
  const res = await fetch("/api/signout", { method: "DELETE" });
  if (!res.ok) throw new HttpError(res.status, res.statusText);
}

let refreshPromise: Promise<Response> | null = null;

export async function refreshAccessToken() {
  try {
    if (!refreshPromise) {
      refreshPromise = fetch("/api/access_token", { method: "POST" });
    }
    const res = await refreshPromise;
    if (!res.ok) throw new HttpError(res.status, res.statusText);
  } finally {
    refreshPromise = null;
  }
}
