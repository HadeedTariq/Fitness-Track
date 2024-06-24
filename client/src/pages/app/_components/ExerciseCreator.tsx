import ExerciseHandler from "./ExerciseHandler";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setExercisePropertiesEmpty } from "../reducers/appReducer";
import DayWiseExercise from "./DayWiseExercise";
import { useExerciseScheduler } from "../hooks/useExerciseScheuler";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";

export type ExerciseCreatorProps = {
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
  const [showExercise, setShowExercise] = useState(false);
  const dispatch = useDispatch();
  const {
    mutations: { exercise, isLoading, isPending, isUpdationPending },
    form: {
      formState,
      handleSubmit,
      onSubmit,
      register,
      setValue,
      sets,
      watch,
    },
  } = useExerciseScheduler({ day, setShowExercise });

  useEffect(() => {
    dispatch(setExercisePropertiesEmpty());
  }, []);
  if (isLoading) return <Loader className="h-[300px]" />;
  return (
    <>
      {exercise && showExercise ? (
        <>
          <DayWiseExercise exercise={exercise} />
          <Button
            className="text-[20px] w-full my-2 font-lato"
            variant={"real"}
            onClick={() => setShowExercise(false)}>
            Update
          </Button>
        </>
      ) : (
        <form
          className="flex flex-col items-center gap-2 p-2"
          onSubmit={handleSubmit(onSubmit)}>
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
                value={watch("exercises")}
                onChange={(e) =>
                  setValue("exercises", parseInt(e.target.value))
                }
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
                    property={exercise?.setProperties[index]}
                    key={index}
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
          <Button
            type="submit"
            disabled={formState.disabled || isPending || isUpdationPending}
            variant={"real"}
            className=" font-lato ">
            {exercise ? "Update" : "Create"}
          </Button>
        </form>
      )}
    </>
  );
};

export default ExerciseCreator;
