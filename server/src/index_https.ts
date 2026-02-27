import https from "node:https";
import { readFileSync } from "node:fs";
import { env } from "./envConfig.js";
import app from "./app.js";

if (!env.HTTPS_KEY || !env.HTTPS_CERT) {
  console.log("Missing env.HTTPS_KEY or env.HTTPS_CERT");
  process.exit(1);
}

const key = readFileSync(env.HTTPS_KEY);
const cert = readFileSync(env.HTTPS_CERT);
https
  .createServer({ key, cert }, app)
  .listen(env.PORT, () => console.log("HTTPS Server started on port:", env.PORT));
