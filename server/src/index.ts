import { ValitaError } from "@badrap/valita";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";
import helmet from "helmet";
import createError from "http-errors";
import morgan from "morgan";
import { existsSync } from "node:fs";
import path from "node:path";
import { env } from "./envConfig.js";
import routes from "./routes.js";

const app = express();
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(morgan("[:date] :method :url - :status"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "*.reddit.com"],
        imgSrc: ["'self'", "*.redd.it", "*.redditstatic.com", "*.redditmedia.com", "*.imgur.com"],
        mediaSrc: ["'self'", "*.redd.it", "*.redditstatic.com", "*.redditmedia.com", "*.imgur.com"],
      },
    },
  }),
);
app.use(routes);

const clientDist = path.join(import.meta.dirname, "../../client/dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  console.log("Serving static files:", clientDist);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((error, _req, res, _next) => {
  if (error instanceof ValitaError) {
    console.log(error.message);
    res.sendStatus(400);
  } else if (createError.isHttpError(error)) {
    console.log(`${error.name}: ${error.message}`);
    res.sendStatus(error.status);
  } else {
    console.log("express error:", error.message);
    res.sendStatus(500);
  }
}) as ErrorRequestHandler);

app.listen(env.PORT, () => console.log("Server started on port:", env.PORT));
