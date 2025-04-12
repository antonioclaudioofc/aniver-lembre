import { z } from "zod";

export const userSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Campo Obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(1, { message: "Campo obrigatório" }),
    confirmPassword: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
});

export type User = z.infer<typeof userSchema>;
