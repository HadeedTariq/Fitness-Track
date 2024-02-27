import { z } from "zod";

export const registerValidator = z.object({
  username: z.string().min(6, { message: "Must be 6 characters long" }),
  email: z.string().email(),
  weight: z.string().min(2, { message: "Weight must be < 30" }),
  age: z.string().min(2, { message: "Must be 18 years old or above" }),
  height: z.string().min(1, { message: "Height required" }),
  gender: z.enum(["male", "female"]),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be less than 20 characters long"),
});

export const loginValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be less than 20 characters long"),
});

export type RegisterValidator = z.infer<typeof registerValidator>;
export type LoginValidator = z.infer<typeof loginValidator>;
