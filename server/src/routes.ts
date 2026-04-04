import { Hono } from "hono";
import { setSignedCookie, deleteCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";
import { literal, number, object, string, type Infer } from "@badrap/valita";
import { authorize, refreshAccessToken, revokeToken } from "./reddit.js";
import * as v from "./validator.js";
import { env } from "./envConfig.js";

export const routes = new Hono();

routes.get("/auth/redirect", (c) => {
  return c.redirect(
    `https://www.reddit.com/api/v1/authorize?client_id=${env.REDDIT_CLIENT_ID}&response_type=code&state=_&redirect_uri=${env.REDDIT_REDIRECT_URI}&duration=permanent&scope=identity history save`,
  );
});

const Session = object({
  access_token: string(),
  refresh_token: string(),
  expires_at: number(),
});

type Session = Infer<typeof Session>;

const cookieOptions: CookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
};

routes.get(
  "/auth/callback",
  v.query(object({ code: string(), state: literal("_") })),
  async (c) => {
    const { code } = c.req.valid("query");
    const data = await authorize(code);
    const session: Session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_in * 1000 + Date.now(),
    };
    await setSignedCookie(c, "session", JSON.stringify(session), env.COOKIE_SECRET, cookieOptions);
    return c.redirect("/");
  },
);

type OmitRefreshToken = Omit<Session, "refresh_token">;

routes.post("/auth/session", v.signedJSONCookie(Session), async (c) => {
  const oldSession = c.req.valid("cookie");
  const isExpired = Date.now() >= oldSession.expires_at;
  if (isExpired) {
    const data = await refreshAccessToken(oldSession.refresh_token);
    const newSession: Session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_in * 1000 + Date.now(),
    };
    const jsonSession = JSON.stringify(newSession);
    await setSignedCookie(c, "session", jsonSession, env.COOKIE_SECRET, cookieOptions);
    return c.json<OmitRefreshToken>({
      access_token: newSession.access_token,
      expires_at: newSession.expires_at,
    });
  } else {
    return c.json<OmitRefreshToken>({
      access_token: oldSession.access_token,
      expires_at: oldSession.expires_at,
    });
  }
});

routes.delete("/auth/signout", v.signedJSONCookie(Session), async (c) => {
  const session = c.req.valid("cookie");
  deleteCookie(c, "session", cookieOptions);
  await revokeToken("refresh_token", session.refresh_token);
  return c.body(null, 204);
});
