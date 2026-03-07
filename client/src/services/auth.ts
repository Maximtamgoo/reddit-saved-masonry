import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export async function signInRedirect() {
  authClient.signIn.social({
    provider: "reddit",
  });
}

export let username = "";

export async function getSession() {
  const res = await authClient.getSession();
  if (res.error) throw res.error;
  if (!res.data) throw Error("Session is null");
  username = res.data.user.name;
  return res.data;
}

let accessToken: string | undefined = undefined;
let accessTokenExpiresAt: Date | undefined = undefined;

export async function getAccessToken() {
  if (
    accessToken &&
    accessTokenExpiresAt &&
    accessTokenExpiresAt.getUTCMilliseconds() < Date.now()
  ) {
    return accessToken;
  }
  const res = await authClient.getAccessToken({ providerId: "reddit" });
  if (res.error) throw res.error;
  accessToken = res.data.accessToken;
  accessTokenExpiresAt = res.data.accessTokenExpiresAt;
  return res.data.accessToken;
}

export async function signOut() {
  username = "";
  await authClient.signOut();
}
