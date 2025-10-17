import 'module-alias/register';
import express from 'express';
import { config } from './config/config';
import authRouter from './route/auth.route';
import notificationRouter from './route/notification.route';
import cors from "cors";
import Logger from './config/logger';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter)
app.use("/api/notification", notificationRouter)

app.get("/api/health-check", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(config.PORT, () => {
  Logger.success(`Server is running on port ${config.PORT}`);
});
