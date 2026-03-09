import HttpError from "@src/utils/HttpError";

const getCookieValue = async (name: string) => (await window.cookieStore.get(name))?.value;

export async function getAccessToken() {
  const token = await getCookieValue("access_token");
  if (token) return token;
  const res = await fetch("/api/access_token", { method: "POST" });
  if (!res.ok) throw new HttpError(res.status, res.statusText);
  const newToken = await getCookieValue("access_token");
  return newToken;
}

export function signInRedirect() {
  window.location.href = "/api/redirect";
}

export async function signOut() {
  const res = await fetch("/api/signout", { method: "DELETE" });
  if (!res.ok) throw new HttpError(res.status, res.statusText);
}
