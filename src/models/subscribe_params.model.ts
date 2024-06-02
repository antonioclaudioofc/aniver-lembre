import { z } from "zod";
import { eventSchema } from "./event.model";

export const subscribeParamsSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("event"),
    ...eventSchema.shape,
  }),
]);

export type SubscribeParams = z.infer<typeof subscribeParamsSchema>;