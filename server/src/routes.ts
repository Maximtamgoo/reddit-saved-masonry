import { literal, object, string, union } from "@badrap/valita";
import express from "express";
import { env } from "./envConfig.js";
import { authorize, getNewAccessToken, revokeToken, toggleBookmark } from "./reddit.js";
import { validateRequest } from "./validateRequest.js";
const router = express.Router();

const accessTokenOptions = (maxAge: number) =>
  ({
    maxAge,
    sameSite: "lax",
    secure: true,
  }) as const;

router.get("/api/authurl", (_req, res, next) => {
  try {
    res.redirect(
      `https://www.reddit.com/api/v1/authorize?client_id=${env.REDDIT_CLIENTID}&response_type=code&state=_&redirect_uri=${env.REDDIT_REDIRECT_URI}&duration=permanent&scope=identity history save`,
    );
  } catch (error) {
    next(error);
  }
});

router.post(
  "/api/authorize",
  validateRequest({
    body: object({ authorization_code: string() }),
  }),
  async (req, res, next) => {
    try {
      const code = req.body.authorization_code as string;
      const token = await authorize(code);
      res.cookie("access_token", token.access_token, accessTokenOptions(token.expires_in * 1000));
      res.cookie("refresh_token", token.refresh_token, {
        maxAge: 2629800 * 1000,
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      });
      res.send();
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/api/access_token",
  validateRequest({
    cookies: object({ refresh_token: string() }),
  }),
  async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const token = await getNewAccessToken(refresh_token);
      res.cookie("access_token", token.access_token, accessTokenOptions(token.expires_in * 1000));
      res.send();
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/api/signout",
  validateRequest({
    cookies: object({ refresh_token: string() }),
  }),
  async (req, res, next) => {
    try {
      res.clearCookie("refresh_token");
      res.clearCookie("access_token");
      const refresh_token = req.cookies.refresh_token as string;
      await revokeToken("refresh_token", refresh_token);
      res.send();
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/api/bookmark/:id",
  validateRequest({
    cookies: object({ access_token: string() }),
    params: object({ id: string() }),
    query: object({ state: union(literal("unsave"), literal("save")) }),
  }),
  async (req, res, next) => {
    try {
      const access_token = req.cookies.access_token as string;
      const id = req.params.id as string;
      const state = req.query.state as "unsave" | "save";
      const newState = await toggleBookmark(access_token, state, id);
      res.send({ saved: newState === "save" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
