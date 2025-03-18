import { literal, string, union } from "@badrap/valita";
import express, { type Request } from "express";
import { env } from "./envConfig.js";
import { authorize, getNewAccessToken, revokeToken, toggleBookmark } from "./reddit.js";
const router = express.Router();

type UnknownObj = {
  [x: string]: unknown;
};
type Req = Request<UnknownObj, UnknownObj, UnknownObj>;

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

router.post("/api/authorize", async (req: Req, res, next) => {
  try {
    const code = string().parse(req.body.authorization_code);
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
});

router.post("/api/access_token", async (req: Req, res, next) => {
  try {
    const refresh_token = string().parse(req.cookies.refresh_token);
    const token = await getNewAccessToken(refresh_token);
    res.cookie("access_token", token.access_token, accessTokenOptions(token.expires_in * 1000));
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/api/signout", async (req: Req, res, next) => {
  try {
    const refresh_token = string().parse(req.cookies.refresh_token);
    await revokeToken("refresh_token", refresh_token);
    res.clearCookie("refresh_token");
    res.clearCookie("access_token");
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/api/bookmark/:state", async (req: Req, res, next) => {
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
