import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").trim(),
  email: z.string().email({ message: "Email inválido" }).trim(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
