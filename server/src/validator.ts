import { object, type Type } from "@badrap/valita";
import type { RequestHandler } from "express";
import { ValidationError } from "./errors.js";

type Target = "query" | "signedCookies";

type Schemas = Record<string, Type>;

function validator(target: Target, schemas: Schemas) {
  return ((req, _res, next) => {
    const r = object(schemas).try(req[target], { mode: "passthrough" });
    if (r.ok) {
      next();
    } else {
      const status = target === "signedCookies" ? 401 : 400;
      const issue = r.issues[0];
      const msg = `ValidationError in ${target}: '${issue.code}' at '${issue.path}'`;
      next(new ValidationError(status, r.issues, msg));
    }
  }) as RequestHandler;
}

export const query = (schemas: Schemas) => validator("query", schemas);

export const signedCookies = (schemas: Schemas) => validator("signedCookies", schemas);
