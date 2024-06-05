import { ISO8601DateRegex } from "@/utils/regex";
import { isValidData } from "@/utils/validation";
import { z } from "zod";

export const eventSchema = z.object({
  nomeEvento: z.string().min(1, { message: "Campo obrigatório" }),
  notificacaoDiaria: z.boolean(),
  localizacao: z.string().optional(),
  email: z.string().email({ message: "Email inválido" }),
  notas: z.string().optional(),
  imagemLinkURL: z.string().url({ message: "URL inválida" }),
  intervaloNotificacao: z
    .number()
    .min(0, { message: "Notificação deve ser um número positivo" }),
  frequencia: z
    .number()
    .min(0, { message: "Repetição deve ser um número positivo" }),
  dataLimite: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .regex(ISO8601DateRegex, { message: "Data inválida" })
    .refine((data: string) => isValidData(data), {
      message: "Data inválida",
    }),
});

export type Evento = z.infer<typeof eventSchema>;
