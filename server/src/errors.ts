type ErrorCode = "HTTP_ERROR" | "VALIDATION_ERROR";

class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  constructor(code: ErrorCode, status: number, cause: unknown, message?: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.cause = cause;
  }
}

export class HttpError extends AppError {
  constructor(status: number, cause: unknown, message?: string) {
    super("HTTP_ERROR", status, cause, message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(status: number, cause: unknown, message?: string) {
    super("VALIDATION_ERROR", status, cause, message);
    this.name = this.constructor.name;
  }
}
