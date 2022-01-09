import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";
import sanitize from "sanitize-filename";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const sanitizedFileName = sanitize(file.originalname.replace(/\s/g, "-"));
      const fileName = `${fileHash}-${sanitizedFileName}`;
      return callback(null, fileName);
    },
  }),
};
