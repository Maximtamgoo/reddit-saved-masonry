import { createMiddleware } from "hono/factory";

export const logger = createMiddleware(async (c, next) => {
  const start = performance.now();
  const isoDate = new Date().toISOString();
  await next();
  const method = c.req.method;
  const path = c.req.path;
  const status = c.res.status;
  const duration = performance.now() - start;
  console.log(`[${isoDate}] ${method} ${path} ${status} ${duration.toFixed()}ms`);
});
