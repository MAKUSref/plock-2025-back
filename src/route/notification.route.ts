import { Router } from "express";
import { errorHandler } from "../exception/errorHandler";
import { NotificationController } from "../controller/notification.controller";

const router = Router();

router.get("/stream", errorHandler(NotificationController.streamingNotifications));

export default router;
