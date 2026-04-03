import { createServer } from "node:https";
import { readFileSync } from "node:fs";
import { serve } from "@hono/node-server";
import { env } from "./envConfig.js";
import app from "./app.js";

if (!env.HTTPS_KEY || !env.HTTPS_CERT) {
  console.log("Missing env.HTTPS_KEY or env.HTTPS_CERT");
  process.exit(1);
}

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
    createServer,
    serverOptions: {
      key: readFileSync(env.HTTPS_KEY),
      cert: readFileSync(env.HTTPS_CERT),
    },
  },
  ({ port }) => console.log("HTTPS Server started on port:", port),
);
