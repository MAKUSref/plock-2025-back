import { AppError } from "../exception/AppError";
import { HTTP_STATUS_CODE } from "../exception/http";

export class AuthService {
  static async login(email: string, password: string): Promise<string> {
    // Implement login logic here
    // throw new AppError("login.failed");
    return "token";
  }
}
