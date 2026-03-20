import { literal, number, object, string, type Type } from "@badrap/valita";
import { HttpError, ValidationError } from "./errors.js";
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

async function request<T>(url: string, schema: Type<T>, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new HttpError(res.status, text, "HttpError in fetch response: " + text);
  }
  const r = schema.try(await res.json());
  if (!r.ok) {
    const msg = `ValidationError in fetch response: '${r.issues[0].code}' at '${r.issues[0].path}'`;
    throw new ValidationError(500, r.issues, msg);
  }
  return r.value;
}

export async function authorize(code: string) {
  return await request("https://www.reddit.com/api/v1/access_token", RedditTokens, {
    ...options,
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${env.REDDIT_REDIRECT_URI}`,
  });
}

export async function refreshAccessToken(refreshToken: string) {
  return await request("https://www.reddit.com/api/v1/access_token", RedditTokens, {
    ...options,
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${env.REDDIT_REDIRECT_URI}`,
  });
}

export async function revokeToken(tokenHint: "access_token" | "refresh_token", token: string) {
  const res = await fetch("https://www.reddit.com/api/v1/revoke_token", {
    ...options,
    body: `token=${token}&token_type_hint=${tokenHint}&redirect_uri=${env.REDDIT_REDIRECT_URI}`,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new HttpError(res.status, text, "HttpError in fetch response: " + text);
  }
  const r = literal("0").try(res.headers.get("content-length"));
  if (!r.ok) {
    const msg = `ValidationError in fetch response: '${r.issues[0].code}' at '${r.issues[0].path}'`;
    throw new ValidationError(500, r.issues, msg);
  }
}
