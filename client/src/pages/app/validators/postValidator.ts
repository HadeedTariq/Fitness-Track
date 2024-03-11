import { z } from "zod";

export const postValidator = z.object({
  title: z.string().min(40, { message: "Minimum 40 characters long" }),
  description: z.string().min(120, { message: "Minimum 120 characters long" }),
});

export type PostValidator = z.infer<typeof postValidator>;
