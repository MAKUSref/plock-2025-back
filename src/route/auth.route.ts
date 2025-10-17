import { Router } from "express";
import { errorHandler } from "../exception/errorHandler";
import { AuthController } from "../controller/auth.controller";

const router = Router();

router.post("/login", errorHandler(AuthController.login));

export default router;