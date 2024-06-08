import { ISO8601DateRegex, timeRegex } from "@/utils/regex";
import { isValidData } from "@/utils/validation";
import { z } from "zod";

export const birthdaySchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  birthDate: z
    .string()
    .min(1, { message: "Campo obrigatótio" })
    .regex(ISO8601DateRegex, { message: "Data inválida" })
    .refine((date: string) => isValidData(date), {
      message: "Data inválida",
    }),
  notificationDate: z
    .string()
    .min(1, { message: "Campo obrigatótio" })
    .regex(ISO8601DateRegex, { message: "Data inválida" })
    .refine((date: string) => isValidData(date), {
      message: "Data inválida",
    }),
  notificationTime: z
    .string()
    .min(1, { message: "Campo obbrigatório" })
    .regex(timeRegex, { message: "Horário inválido" }),
  description: z.string().optional(),
  email: z.string().email({ message: "Email inválido" }),
  imageLinkURL: z.string().optional(),
});

export type Birthday = z.infer<typeof birthdaySchema>;
