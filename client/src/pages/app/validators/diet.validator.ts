import { z } from "zod";

export const mealProperties = z
  .array(
    z.object({
      mealName: z.string().min(3, { message: "Must be 3 characters long" }),
      mealTime: z.string().min(3, { message: "Must be 3 characters long" }),
      calories: z.number(),
      _id: z.string().optional(),
    })
  )
  .min(1, { message: "Meal Properties required" });
export type DietMealValidator = z.infer<typeof mealProperties>;

export const dietValidator = z.object({
  totalMeals: z.number().min(1, { message: "Must be greater than one" }),
  mealProperties: mealProperties,
});

export type DietValidator = z.infer<typeof dietValidator>;
