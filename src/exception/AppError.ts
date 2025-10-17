import { HTTP_STATUS_CODE } from "./http";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode = HTTP_STATUS_CODE.BAD_REQUEST
  ) {
    super(message);
  }
}
