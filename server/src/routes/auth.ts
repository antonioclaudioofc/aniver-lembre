import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request) => {
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

    const auth = await prisma.user.create({
      data: {
        name,
        username,
        email,
        avatarUser,
        password: hashedPassword,
      },
    });

    return auth;
  });

  app.post("/login", async (request) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return;
    }

    return "Deu certo !";
  });
}
