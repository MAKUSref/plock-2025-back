import { Request, Response } from "express";
import Logger from "../config/logger";

export class NotificationController {
  static async streamingNotifications(_req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    let counter = 0;
    const intervalId = setInterval(() => {
      counter++;
      if (counter >= 25) {
        clearInterval(intervalId);
        res.end();
        return;
      }
      res.write(JSON.stringify({ counter }));
    }, 1000);

    res.on("close", () => {
      Logger.info("Client dropped me");
      clearInterval(intervalId);
      res.end();
    });
  }
}
