import { FastifyInstance } from "fastify";

import { randomUUID } from "node:crypto";
import { createWriteStream, write } from "node:fs";
import { extname, resolve } from "node:path";
import { promisify } from "node:util";
import { pipeline } from "node:stream";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        fieldSize: 2000000,
      },
    });

    if (!upload) {
      return reply.status(400).send();
    }

    const mineTypeRegex = /^(image)\/[a-zA-Z]+/;
    const isValidFileFormat = mineTypeRegex.test(upload.mimetype);

    if (!isValidFileFormat) {
      return reply.status(400).send();
    }

    // Estático
   
    const fileId = randomUUID();
    const extension = extname(upload.filename);

    const fileName = fileId.concat(extension);

    const writeStream = createWriteStream(
      resolve(__dirname, "../../uploads", fileName)
    );

    await pump(upload.file, writeStream);

    const fullUrl = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

    return { fileUrl };
  });
}
