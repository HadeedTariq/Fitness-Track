import { z } from "zod";

export const mealProperties = z.array(
  z.object({
    mealName: z.string().min(3, { message: "Must be 3 characters long" }),
    mealTime: z.string().min(3, { message: "Must be 3 characters long" }),
    calories: z.number(),
    _id: z.string().optional(),
  })
);
export type DietMealValidator = z.infer<typeof mealProperties>;

export const dietValidator = z.object({
  totalMeals: z.number(),
  mealProperties: mealProperties,
});

export type DietValidator = z.infer<typeof dietValidator>;
