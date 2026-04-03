import { serve } from "@hono/node-server";
import { env } from "./envConfig.js";
import app from "./app.js";

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  ({ port }) => console.log("Server started on port:", port),
);
