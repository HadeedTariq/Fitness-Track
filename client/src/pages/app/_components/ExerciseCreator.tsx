import ExerciseHandler from "./ExerciseHandler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExerciseValidator,
  exerciseValidator,
} from "../validators/exerciseValidator";

type ExerciseCreatorProps = {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
};

const ExerciseCreator = ({ day }: ExerciseCreatorProps) => {
  const { register, setValue, formState, reset, watch } =
    useForm<ExerciseValidator>({
      resolver: zodResolver(exerciseValidator),
      values: {
        exerciseDay: day,
        exerciseName: "",
        exercises: 0,
        exerciseType: "lower",
        properties: [],
      },
    });
  const sets = watch("exercises");
  const properties = watch("properties");
  return (
    <form className="flex flex-col items-center gap-2 p-2">
      <div className="w-full gap-2 flex items-center">
        <div className="w-full">
          <p>Exercise Name</p>
          <input
            {...register("exerciseName")}
            type="text"
            placeholder="exerciseName"
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
          {formState.errors.exerciseName && (
            <p className="text-red-500 font-ubuntu text-[12px]">
              {formState.errors.exerciseName.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <p>Exercise Type</p>
          <select
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
            {...register("exerciseType")}>
            <option value="lower" className="cursor-pointer">
              Lower
            </option>
            <option value="upper" className="cursor-pointer">
              Upper
            </option>
          </select>
          {formState.errors.exerciseType && (
            <p className="text-red-500 font-ubuntu text-[12px]">
              {formState.errors.exerciseType.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full gap-2 flex items-center">
        <div className="w-full flex flex-col">
          <p>Exercises</p>
          <input
            {...register("exercises")}
            type="number"
            placeholder="exerciseSets"
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
          {formState.errors.exercises && (
            <p className="text-red-500 font-ubuntu text-[12px]">
              {formState.errors.exercises.message}
            </p>
          )}
          <div className="flex flex-col gap-2 items-center mt-2">
            {Array.from({ length: sets })?.map((_, index) => (
              <ExerciseHandler
                index={index}
                register={register}
                setValue={setValue}
                formState={formState}
                watch={watch}
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExerciseCreator;
