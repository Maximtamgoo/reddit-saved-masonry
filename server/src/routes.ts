import { string } from "@badrap/valita";
import express from "express";
import { env } from "./envConfig.js";
import { authorize, refreshAccessToken, revokeToken } from "./reddit.js";
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

router.get("/api/callback", async (req, res, next) => {
  try {
    const code = string().parse(req.query.code);
    const data = await authorize(code);
    res.cookie("refresh_token", data.refresh_token, {
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
      sameSite: "strict",
      secure: true,
      httpOnly: true,
    });
    res.cookie("access_token", data.access_token, {
      maxAge: data.expires_in * 1000, // 24 hours in milliseconds
      sameSite: "lax",
      secure: true,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.post("/api/access_token", async (req, res, next) => {
  try {
    const refresh_token = string().parse(req.signedCookies.refresh_token);
    const data = await refreshAccessToken(refresh_token);
    res.cookie("access_token", data.access_token, {
      maxAge: data.expires_in * 1000, // 24 hours in milliseconds
      sameSite: "lax",
      secure: true,
    });
    res.send();
  } catch (error) {
    next(error);
  }
});

router.delete("/api/signout", async (req, res, next) => {
  try {
    res.clearCookie("refresh_token");
    res.clearCookie("access_token");
    const refresh_token = string().parse(req.signedCookies.refresh_token);
    await revokeToken("refresh_token", refresh_token);
    res.send();
  } catch (error) {
    next(error);
  }
});

export default router;
