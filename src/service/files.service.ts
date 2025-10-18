import fs, { ReadStream } from "fs";
import path from "path";
import { Request, Response } from "express";

export class FilesService {

    static async getFile(name: string): Promise<ReadStream> {
        try {

            const binDir = path.resolve(__dirname, "../../bin");
            // Normalize and resolve target path
            const targetPath = path.resolve(binDir, name);

            // Ensure the resolved path is inside the bin directory (prevent path traversal)
            const root = binDir.endsWith(path.sep) ? binDir : binDir + path.sep;
            if (!targetPath.startsWith(root)) {
                throw new Error("Invalid file path");
            }

            const stat = await fs.promises.stat(targetPath).catch(() => null);
            if (!stat || !stat.isFile()) {
                throw new Error("File not found");
            }

            // Stream the file
            const stream = fs.createReadStream(targetPath);
            stream.on("error", (err) => {
                throw new Error("Error reading file: " + err.message);
            });
            return stream;
        } catch (err) {
            throw new Error("Error retrieving file: " + err);
        }
    }
}

export default FilesService;