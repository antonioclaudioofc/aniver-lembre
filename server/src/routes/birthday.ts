import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function birthdayRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/birthdays", async (request) => {
    const birthdays = await prisma.birthday.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        personName: "asc",
      },
    });

    return birthdays;
  });

  app.get("/birthdays/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const birthday = await prisma.birthday.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (birthday.userId !== request.user.sub) {
      return reply.status(401).send();
    }

    return birthday;
  });

  app.post("/birthdays", async (request) => {
    const bodySchema = z.object({
      personName: z.string(),
      dateOfBirth: z.string(),
      avatarBirthday: z.string(),
    });

    const { personName, dateOfBirth, avatarBirthday } = bodySchema.parse(
      request.body
    );

    const birthday = await prisma.birthday.create({
      data: {
        avatarBirthday,
        personName,
        dateOfBirth,
        userId: request.user.sub,
      },
    });

    return birthday;
  });

  app.put("/birthdays/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      personName: z.string(),
      dateOfBirth: z.string(),
      avatarBirthday: z.string(),
    });

    const { personName, dateOfBirth, avatarBirthday } = bodySchema.parse(
      request.body
    );

    let birthday = await prisma.birthday.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (birthday.userId !== request.user.sub) {
      return reply.status(401).send();
    }

    birthday = await prisma.birthday.update({
      where: {
        id,
      },
      data: {
        personName,
        dateOfBirth,
        avatarBirthday,
      },
    });

    return birthday;
  });

  app.delete("/birthdays/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const birthday = await prisma.birthday.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (birthday.userId !== request.user.sub) { 
      return reply.status(401).send();
    }

    await prisma.birthday.delete({
      where: {
        id,
      },
    });
  });
}
