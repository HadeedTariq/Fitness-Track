import ExerciseHandler from "./ExerciseHandler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExerciseValidator,
  exerciseValidator,
} from "../validators/exerciseValidator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setExercisePropertiesEmpty } from "../reducers/appReducer";
import { useMutation } from "@tanstack/react-query";
import { exercisesApi } from "../../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "../types/appTypes";
import DayWiseExercise from "./DayWiseExercise";

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
  const [showExercise, setShowExercise] = useState(false);
  const { data: exercise, isLoading } = useQuery({
    queryKey: [`${day}`],
    queryFn: async () => {
      const { data } = await exercisesApi.get(`/${day}`);
      console.log(data);
      if (data !== null) {
        setShowExercise(true);
      }
      return data as Exercise;
    },
  });
  const toast = useToast();
  const dispatch = useDispatch();
  const { register, setValue, formState, reset, watch, handleSubmit } =
    useForm<ExerciseValidator>({
      resolver: zodResolver(exerciseValidator),
      values: {
        exerciseDay: exercise?.exerciseDay || day,
        exerciseName: exercise?.exerciseName || "",
        exercises: exercise?.exercises || 0,
        exerciseType: exercise?.exerciseType || "lower",
        properties: exercise?.setProperties || [],
      },
    });
  const sets = watch("exercises");

  const { mutate: createExercise, isPending } = useMutation({
    mutationKey: ["createExercise"],
    mutationFn: async (values: ExerciseValidator) => {
      const { data } = await exercisesApi.post("/create", values);
      toast({
        title: "Exercise created successfully" || data.message,
        status: "success",
        isClosable: true,
        duration: 1000,
      });
      reset();
    },
  });
  const { mutate: updateExercise, isPending: isUpdationPending } = useMutation({
    mutationKey: ["updateExercise"],
    mutationFn: async (values: ExerciseValidator) => {
      const { data } = await exercisesApi.put("/update", values);
      toast({
        title: "Exercise updated successfully" || data.message,
        status: "success",
        isClosable: true,
        duration: 1000,
      });
      reset();
    },
  });

  const onSubmit = (values: ExerciseValidator) => {
    const realProperties = values.properties.map((property) => {
      delete property._id;
      return property;
    });
    const realExercise = { ...values, properties: realProperties };
    if (!exercise) {
      createExercise(realExercise);
    }
    if (exercise) {
      updateExercise(realExercise);
    }
  };

  useEffect(() => {
    dispatch(setExercisePropertiesEmpty());
  }, []);
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      {exercise && showExercise ? (
        <>
          <DayWiseExercise exercise={exercise} />
          <button
            className="text-[20px] w-full my-2 font-lato p-[4px] bg-purple-500 rounded-md text-white mx-3"
            onClick={() => setShowExercise(false)}>
            Update
          </button>
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
          <button
            type="submit"
            disabled={formState.disabled || isPending || isUpdationPending}
            className="bg-violet-500 font-lato p-2 text-[18px] text-white rounded-md w-full font-semibold hover:bg-violet-600/90 transition duration-300 disabled:bg-violet-400">
            {exercise ? "Update" : "Create"}
          </button>
        </form>
      )}
    </>
  );
};

export default ExerciseCreator;