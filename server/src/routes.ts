import { number, object, string, type Infer } from "@badrap/valita";
import express, { type CookieOptions, type Request, type Response } from "express";
import { env } from "./envConfig.js";
import { authorize, refreshAccessToken, revokeToken } from "./reddit.js";
import * as v from "./validator.js";
const router = express.Router();

router.get("/api/auth/redirect", (_req, res, next) => {
  try {
    res.redirect(
      `https://www.reddit.com/api/v1/authorize?client_id=${env.REDDIT_CLIENT_ID}&response_type=code&state=_&redirect_uri=${env.REDDIT_REDIRECT_URI}&duration=permanent&scope=identity history save`,
    );
  } catch (error) {
    next(error);
  }
});

const Session = object({
  access_token: string(),
  refresh_token: string(),
  expires_at: number(),
});

type Session = Infer<typeof Session>;

const secure = env.NODE_ENV === "production";

const SessionCookieOptions: CookieOptions = {
  signed: true,
  httpOnly: true,
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
  secure,
};

router.get("/api/auth/callback", v.query({ code: string() }), async (req, res, next) => {
  try {
    const code = req.query.code as string;
    const data = await authorize(code);
    const session: Session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_in * 1000 + Date.now(),
    };
    res.cookie("session", session, SessionCookieOptions);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

type OmitRefreshToken = Omit<Session, "refresh_token">;

router.post(
  "/api/auth/session",
  v.signedCookies({ session: Session }),
  async (req: Request, res: Response<OmitRefreshToken>, next) => {
    try {
      const oldSession = req.signedCookies.session as Session;
      const isExpired = Date.now() >= oldSession.expires_at;
      if (isExpired) {
        const data = await refreshAccessToken(oldSession.refresh_token);
        const newSession: Session = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_at: data.expires_in * 1000 + Date.now(),
        };
        res.cookie("session", newSession, SessionCookieOptions);
        res.send({
          access_token: newSession.access_token,
          expires_at: newSession.expires_at,
        });
      } else {
        res.send({
          access_token: oldSession.access_token,
          expires_at: oldSession.expires_at,
        });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/api/auth/signout",
  v.signedCookies({ session: Session }),
  async (req, res, next) => {
    try {
      res.clearCookie("session");
      const session = req.signedCookies.session as Session;
      await revokeToken("refresh_token", session.refresh_token);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
);

router.use("/api", (_req, res) => {
  res.sendStatus(404);
});

export default router;
