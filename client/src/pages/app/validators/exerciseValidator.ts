import { z } from "zod";

const propertiesVaildator = z
  .array(
    z.object({
      totalReps: z.number(),
      setName: z.string().min(3, { message: "Minimum 3 words required" }),
      eachSetReps: z.number(),
      totalSets: z.number(),
      _id: z.string().optional(),
    })
  )
  .min(1, { message: "Minimum 1 exercise required" });

export type Properties = z.infer<typeof propertiesVaildator>;

export const exerciseValidator = z.object({
  exercises: z.number().min(1, { message: "Minimum one exercise needed" }),
  exerciseName: z.string().min(3, { message: "Minimum 3 words required" }),
  exerciseDay: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  exerciseType: z.enum(["lower", "upper"]),
  properties: propertiesVaildator,
});

export type ExerciseValidator = z.infer<typeof exerciseValidator>;
