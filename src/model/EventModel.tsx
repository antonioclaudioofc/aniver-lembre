import { z } from "zod";

export const EventModel = z.object({
  eventName: z.string({
    required_error: "Digite o nome do evento",
  }),
  eventDate: z.date({
    required_error: "Selecione a data em que o evento ocorrerá",
  }),
  category: z.string({
    required_error:
      "Escolha uma categoria que melhor descreva o tipo de evento",
  }),
  location: z.string().optional(),
  description: z.string().optional(),
  frequency: z.string({
    required_error: "Defina se o evento se repete e com que frequência",
  }),
  urlImage: z.string().optional(),
});

export interface Event extends z.infer<typeof EventModel> {
  id: string;
}
