import { Router } from "express";
import { errorHandler } from "../exception/errorHandler";

const router = Router();

router.get("/api/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  res.json(req.user);
});
export default router;