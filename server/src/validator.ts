import { object, ValitaError, type Type } from "@badrap/valita";
import type { RequestHandler } from "express";

type Target = "query" | "signedCookies";

export class ValidatorError extends Error {
  readonly target: Target;
  readonly status: number;
  readonly cause: ValitaError;
  constructor(target: Target, status: number, error: ValitaError) {
    const issue = error.issues[0];
    super(`ValidatorError in ${target}: '${issue.code}' at '${issue.path}' `);
    this.target = target;
    this.status = status;
    this.cause = error;
  }
}

type Schemas = Record<string, Type>;

function validator(target: Target, schemas: Schemas) {
  return ((req, _res, next) => {
    try {
      object(schemas).parse(req[target], { mode: "passthrough" });
      next();
    } catch (error) {
      if (error instanceof ValitaError) {
        const status = target === "signedCookies" ? 401 : 400;
        next(new ValidatorError(target, status, error));
      } else {
        next(error);
      }
    }
  }) as RequestHandler;
}

export const query = (schemas: Schemas) => validator("query", schemas);

export const signedCookies = (schemas: Schemas) => validator("signedCookies", schemas);
