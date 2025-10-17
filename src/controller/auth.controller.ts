import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const accessToken = await AuthService.login(email, password);
    res.json({ accessToken });
  }
}
