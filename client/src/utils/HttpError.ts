export default class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;

  constructor(status: number, statusText: string) {
    super();
    this.name = this.constructor.name;
    this.status = status;
    this.statusText = statusText;
    this.message = `${status} ${statusText}`;
  }
}
