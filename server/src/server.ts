import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import statics from "@fastify/static";

import { birthdayRoutes } from "./routes/birthday";
import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify();

app.register(statics, {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(multipart);

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "aljkhdfsfgkgh",
});

app.register(birthdayRoutes);
app.register(authRoutes);
app.register(uploadRoutes);

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("HTTP server running");
  });
