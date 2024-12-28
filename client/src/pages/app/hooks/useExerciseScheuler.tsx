import { planApi } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { setExerciseSchedule, setTodayExercises } from "../reducers/appReducer";
import { useDispatch } from "react-redux";
import { FitnessPlan } from "@/types/general";

export const useExerciseSchedule = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["fitnessPlan"],
    queryFn: async () => {
      const { data } = await planApi.get("/");

      if (data.message) {
        return null;
      }
      dispatch(setExerciseSchedule(data));
      dispatch(setTodayExercises());

      const exerciseData = data as FitnessPlan;

      const exercises = exerciseData.exercises.filter(
        (exercise) => exercise.name !== "Rest Day"
      );

      const { exercises: _, ...rest } = exerciseData;
      const updatedExerciseData = {
        ...rest,
        exercises,
      };

      return updatedExerciseData;
    },
  });
};
