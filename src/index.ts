import "module-alias/register";
import express from "express";
import { config, connectToMongo } from "./config/config";
import authRouter from "./route/auth.route";
import notificationRouter from "./route/notification.route";
import filesRouter from "./route/files.route";
import cors from "cors";
import Logger from "./config/logger";
import session from "express-session";
import passport from "./config/passport";

const app = express();
app.use(express.json());
app.use(cors());

connectToMongo()
  .then(() => {
    Logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    Logger.error("Error connecting to MongoDB");
  });

// app.use(
//   cors({
//     origin: "http://localhost:5173", // your React app’s URL
//     credentials: true, // allow sending cookies
//   })
// );

app.use("/ping", (_, res) => {
  res.send("pong");
});

app.use("api/auth", authRouter);

app.use("/api/notification", notificationRouter);

app.use("/api/files", filesRouter);

app.get("/api/health-check", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(config.PORT, () => {
  Logger.success(`Server is running on port ${config.PORT}`);
});
