import { string } from "@badrap/valita";
import express from "express";
import { env } from "./envConfig.js";
import { authorize, refreshAccessToken, revokeToken } from "./reddit.js";
import * as v from "./validator.js";
const router = express.Router();

router.get("/api/redirect", (_req, res, next) => {
  try {
    res.redirect(
      `https://www.reddit.com/api/v1/authorize?client_id=${env.REDDIT_CLIENT_ID}&response_type=code&state=_&redirect_uri=${env.REDDIT_REDIRECT_URI}&duration=permanent&scope=identity history save`,
    );
  } catch (error) {
    next(error);
  }
});

router.get("/api/callback", v.query({ code: string() }), async (req, res, next) => {
  try {
    const code = req.query.code as string;
    const data = await authorize(code);
    res.cookie("refresh_token", data.refresh_token, {
      signed: true,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
    });
    res.cookie("access_token", data.access_token, {
      secure: true,
      sameSite: "strict",
      maxAge: data.expires_in * 1000, // 24 hours in milliseconds
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/api/access_token",
  v.signedCookies({ refresh_token: string() }),
  async (req, res, next) => {
    try {
      const refresh_token = req.signedCookies.refresh_token as string;
      const data = await refreshAccessToken(refresh_token);
      res.cookie("access_token", data.access_token, {
        secure: true,
        sameSite: "strict",
        maxAge: data.expires_in * 1000, // 24 hours in milliseconds
      });
      res.send();
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/api/signout",
  v.signedCookies({ refresh_token: string() }),
  async (req, res, next) => {
    try {
      res.clearCookie("refresh_token");
      res.clearCookie("access_token");
      const refresh_token = req.signedCookies.refresh_token as string;
      await revokeToken("refresh_token", refresh_token);
      res.send();
    } catch (error) {
      next(error);
    }
  },
);

router.use("/api", (_req, res) => {
  res.sendStatus(404);
});

export default router;
