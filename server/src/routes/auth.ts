import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signup", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
      password: z.string(),
      avatarUser: z.string(),
    });

    const { name, username, email, avatarUser, password } = bodySchema.parse(
      request.body
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        avatarUser,
        password: hashedPassword,
      },
    });

    const token = app.jwt.sign(
      {
        name: user.name,
        username: user.username,
        avatarUser: user.avatarUser,
      },
      {
        sub: user.id,
        expiresIn: "2 days",
      }
    );

    reply.header("Authorization", `Bearer ${token}`);

    return token;
  });

  app.post("/login", async (request, reply) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return reply.status(400).send();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return reply.status(400).send();
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        username: user.username,
        avatarUser: user.avatarUser,
      },
      {
        sub: user.id,
        expiresIn: "2 days",
      }
    );

    reply.header("Authorization", `Bearer ${token}`);

    return token;
  });
}
