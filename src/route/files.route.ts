import { Router } from "express";
import { errorHandler } from "../exception/errorHandler";
import { FilesController } from "../controller/files.controller";

const router = Router();

router.get("/:name", errorHandler(FilesController.getGeojsonData));

export default router;
