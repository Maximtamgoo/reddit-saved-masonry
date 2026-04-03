import type { Context } from "hono";
import { validator } from "hono/validator";
import { string, ok, err, type Type } from "@badrap/valita";
import { getSignedCookie } from "hono/cookie";
import { env } from "./envConfig.js";

export function query<T>(schema: Type<T>) {
  return validator("query", (value, c: Context) => {
    const r = schema.try(value);
    if (!r.ok) return c.text("Bad Request", 400);
    return r.value;
  });
}

const JsonString = string().chain((json) => {
  try {
    return ok(JSON.parse(json));
  } catch {
    return err("Invalid JSON");
  }
});

export function signedJSONCookie<T>(schema: Type<T>) {
  return validator("cookie", async (_, c: Context) => {
    const jsonSession = await getSignedCookie(c, env.COOKIE_SECRET, "session");
    const r = JsonString.chain(schema).try(jsonSession);
    if (r.ok) return r.value;
    return c.text("Unauthorized", 401);
  });
}
