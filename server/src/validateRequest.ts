import type { RequestHandler } from "express";
import { type Type } from "@badrap/valita";

type RequestValidators = {
  cookies?: Type;
  params?: Type;
  query?: Type;
  body?: Type;
  headers?: Type;
};

export function validateRequest(validators: RequestValidators) {
  return ((req, _res, next) => {
    try {
      if (validators.cookies) {
        validators.cookies.parse(req.cookies, { mode: "passthrough" });
      }
      if (validators.params) {
        validators.params.parse(req.params);
      }
      if (validators.query) {
        validators.query.parse(req.query);
      }
      if (validators.body) {
        validators.body.parse(req.body);
      }
      if (validators.headers) {
        validators.headers.parse(req.headers, { mode: "passthrough" });
      }
      next();
    } catch (error) {
      next(error);
    }
  }) satisfies RequestHandler;
}
