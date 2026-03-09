import { literal, number, object, string } from "@badrap/valita";
import createError from "http-errors";
import { env } from "./envConfig.js";

export const RedditTokens = object({
  access_token: string(),
  refresh_token: string(),
  expires_in: number(),
  token_type: string(),
  scope: string(),
});

const base64Creds = Buffer.from(`${env.REDDIT_CLIENT_ID}:${env.REDDIT_CLIENT_SECRET}`).toString(
  "base64",
);

const options = {
  method: "POST",
  headers: {
    "User-Agent": env.REDDIT_USERAGENT,
    Authorization: `Basic ${base64Creds}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export async function authorize(code: string) {
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    ...options,
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${env.REDDIT_REDIRECT_URI}`,
  });

  if (!res.ok) throw createError(res.status, res.statusText);
  return RedditTokens.parse(await res.json());
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    ...options,
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${env.REDDIT_REDIRECT_URI}`,
  });

  if (!res.ok) throw createError(res.status, res.statusText);
  return RedditTokens.parse(await res.json());
}

export async function revokeToken(tokenHint: "access_token" | "refresh_token", token: string) {
  const res = await fetch("https://www.reddit.com/api/v1/revoke_token", {
    ...options,
    body: `token=${token}&token_type_hint=${tokenHint}&redirect_uri=${env.REDDIT_REDIRECT_URI}`,
  });

  if (!res.ok) throw createError(res.status, res.statusText);
  return literal("0").parse(res.headers.get("content-length"));
}
