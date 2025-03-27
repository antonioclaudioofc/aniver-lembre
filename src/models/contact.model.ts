import { ISO8601DateRegex } from "@/utils/regex";
import { isValidBirthData } from "@/utils/validation";
import { z } from "zod";

export const RelationshipEnum = z.enum([
  "Amigo(a)",
  "Familiares",
  "Colega de trabalho",
  "Vizinho(a)",
  "Outros",
]);

export const contactSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Campo Obrigatório" }),
  birthdate: z
    .string()
    .min(1, { message: "Campo obrigatória" })
    .regex(ISO8601DateRegex, "Data inválida")
    .refine((data) => isValidBirthData(data), {
      message: "Data inválida",
    }),
  relationship: RelationshipEnum,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
