import { literal, string, union } from "@badrap/valita";
import express from "express";
import { env } from "./envConfig.js";
import { authorize, getNewAccessToken, revokeToken, toggleBookmark } from "./reddit.js";
const router = express.Router();

const isProduction = env.NODE_ENV === "production";

const accessTokenOptions = (maxAge: number) =>
  ({
    maxAge,
    sameSite: "lax",
    secure: isProduction
  }) as const;

const refreshTokenOptions = {
  maxAge: 2629800 * 1000,
  sameSite: "strict",
  secure: isProduction,
  httpOnly: true
} as const;

router.get("/api/authurl", async (_req, res, next) => {
  try {
    res.redirect(
      `https://www.reddit.com/api/v1/authorize?client_id=${env.REDDIT_CLIENTID}&response_type=code&state=_&redirect_uri=${env.REDDIT_REDIRECT_URI}&duration=permanent&scope=identity history save`
    );
  } catch (error) {
    next(error);
  }
});

router.post("/api/authorize", async (req, res, next) => {
  try {
    const authorization_code = string().parse(req.body.authorization_code);
    const token = await authorize(authorization_code);
    res.cookie("access_token", token.access_token, accessTokenOptions(token.expires_in * 1000));
    res.cookie("refresh_token", token.refresh_token, refreshTokenOptions);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/api/access_token", async (req, res, next) => {
  try {
    const refresh_token = string().parse(req.cookies.refresh_token);
    const token = await getNewAccessToken(refresh_token);
    res.cookie("access_token", token.access_token, accessTokenOptions(token.expires_in * 1000));
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/api/signout", async (req, res, next) => {
  try {
    const refresh_token = string().parse(req.cookies.refresh_token);
    await revokeToken("refresh_token", refresh_token);
    res.clearCookie("refresh_token");
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/api/bookmark/:state", async (req, res, next) => {
  try {
    const state = union(literal("unsave"), literal("save")).parse(req.params.state);
    const id = string().parse(req.body.id);
    const bearerAccessToken = string().parse(req.headers.authorization);
    const access_token = bearerAccessToken.split(" ")[1];
    await toggleBookmark(access_token, state, id);
    res.send({ saved: state === "save" });
  } catch (error) {
    next(error);
  }
});

export default router;
