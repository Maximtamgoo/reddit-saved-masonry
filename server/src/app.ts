import { existsSync } from "node:fs";
import path from "node:path";
import express, { type ErrorRequestHandler } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import createError from "http-errors";
import morgan from "morgan";
import { ValitaError } from "@badrap/valita";
import { env } from "./envConfig.js";
import routes from "./routes.js";

const app = express();
app.use(
  morgan("[:date] :method :url - :status", {
    skip: (req, _res) => ["/assets/", "/favicon"].some((s) => req.url.includes(s)),
  }),
);
app.use(express.json());
app.use(compression());
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "*.reddit.com"],
        // * The hash is for the inline theme script in index.html
        scriptSrc: ["'self'", "'sha256-D3WBEfoS2UbbOoQF/EQYkpnF95d4nteXB8Yrs0LxZRE='"],
        imgSrc: ["'self'", "*.redd.it", "*.redditstatic.com", "*.redditmedia.com", "*.imgur.com"],
        mediaSrc: ["'self'", "*.redd.it", "*.redditstatic.com", "*.redditmedia.com", "*.imgur.com"],
      },
    },
  }),
);

app.use(routes);

if (env.NODE_ENV === "production") {
  const clientDist = path.join(import.meta.dirname, "../../client/dist");
  if (!existsSync(clientDist)) {
    throw Error(`Client dist folder does not exist: ${clientDist}`);
  }
  app.use(express.static(clientDist));
  console.log("Serving static files:", clientDist);
  app.get("/*all", (_req, res) => res.sendFile(clientDist + "/index.html"));
}

app.use(((error, _req, res, _next) => {
  if (error instanceof ValitaError) {
    console.log(error.message);
    res.sendStatus(400);
  } else if (createError.isHttpError(error)) {
    console.log(`${error.name}: ${error.message}`);
    res.sendStatus(error.status);
  } else {
    console.log("unknown error:", error);
    res.sendStatus(500);
  }
}) as ErrorRequestHandler);

export default app;
