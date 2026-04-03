import path from "node:path";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { HTTPException } from "hono/http-exception";
import { compress } from "hono/compress";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "./logger.js";
import { routes } from "./routes.js";
import { env } from "./envConfig.js";

const app = new Hono();
app.use(logger);
app.use(
  secureHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'self'", "*.reddit.com"],
      // * The hash is for the inline theme script in index.html
      scriptSrc: ["'self'", "'sha256-D3WBEfoS2UbbOoQF/EQYkpnF95d4nteXB8Yrs0LxZRE='"],
      imgSrc: ["'self'", "*.redd.it", "*.redditstatic.com", "*.redditmedia.com", "*.imgur.com"],
      mediaSrc: ["'self'", "*.redd.it", "*.redditstatic.com", "*.redditmedia.com", "*.imgur.com"],
    },
  }),
);
app.route("/api", routes);

if (env.NODE_ENV === "production") {
  const clientDist = path.join(import.meta.dirname, "../../client/dist");
  if (!existsSync(clientDist)) {
    console.log(`Client dist folder does not exist: ${clientDist}`);
    process.exit(1);
  }
  app.use(compress());
  app.use("/*", serveStatic({ root: clientDist }), async (c) => {
    const html = await readFile(clientDist + "/index.html", "utf-8");
    return c.html(html);
  });
  console.log("Serving static files:", clientDist);
}

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    console.error(error);
    return error.getResponse();
  }
  console.error(error);
  return c.text("Internal Server Error", 500);
});

export default app;
