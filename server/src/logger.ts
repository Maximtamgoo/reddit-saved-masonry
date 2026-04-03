import { createMiddleware } from "hono/factory";

export const logger = createMiddleware(async (c, next) => {
  const start = performance.now();
  const isoStart = new Date().toISOString();
  const method = c.req.method;
  const path = c.req.path;
  console.log(`<-- [${isoStart}] ${method} ${path}`);
  await next();
  const status = c.res.status;
  const isoEnd = new Date().toISOString();
  const duration = performance.now() - start;
  console.log(`--> [${isoEnd}] ${method} ${path} ${status} ${duration.toFixed()}ms`);
});
