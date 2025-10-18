import FilesService from "../service/files.service";
import { Request, Response } from "express";

export class FilesController {
    static async getGeojsonData(req: Request, res: Response) {
        const name = req.params.name;

        const stream = await FilesService.getFile(`${name}.geojson`);
        stream.pipe(res);
    }
}