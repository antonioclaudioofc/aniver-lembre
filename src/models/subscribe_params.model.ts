import { z } from "zod";
import { birthdaySchema } from "./birthday.model";

export const subscribeParamsSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("birth"),
    ...birthdaySchema.shape,
  }),
]);

export type SubscribeParams = z.infer<typeof subscribeParamsSchema>;