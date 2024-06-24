import { useQuery } from "@tanstack/react-query";
import { GrStatusGood } from "react-icons/gr";

import { dayFormatter } from "../utils/dayFormatter";
import { dailyExerciseApi, exercisesApi } from "../../../utils/axios";
import { Exercise } from "../types/appTypes";
import WorkoutHandler from "../_components/WorkoutHandler";
import ExerciseNotCreatedYet from "../_components/ExerciseNotCreatedYet";
import { useMemo } from "react";
import Loader from "@/components/ui/Loader";

const StartExercise = () => {
  const date = new Date().getDay();
  const day = useMemo(() => {
    return dayFormatter(date);
  }, []);

  const { data, error } = useQuery({
    queryKey: ["dailyExercise"],
    queryFn: async () => {
      const { data }: { data: Exercise } = await dailyExerciseApi.get("/today");
      if (data) {
        const todayDate = new Date();
        const exerciseDate = new Date(data?.createdAt);
        const userExerciseTodayOrNot =
          exerciseDate.toLocaleDateString() === todayDate.toLocaleDateString();
        return userExerciseTodayOrNot;
      }
    },
  });

  const { data: exercise, isLoading } = useQuery({
    queryKey: [`TodayExercise`],
    queryFn: async () => {
      const { data }: { data: Exercise } = await exercisesApi.get(`/${day}`);
      if (data._id) {
        return data as Exercise;
      } else {
        return null;
      }
    },
  });
  if (isLoading) return <Loader />;
  return (
    <>
      {!error && data ? (
        <div className="flex items-center justify-center w-full min-h-[100vh]">
          <h1 className="text-3xl text-center max-[820px]:text-[25px] font-bold font-kode-mono flex items-center gap-2">
            You have Completed Today exercise{" "}
            <GrStatusGood size={28} color="green" />
          </h1>
        </div>
      ) : exercise ? (
        <WorkoutHandler exercise={exercise} />
      ) : (
        <ExerciseNotCreatedYet day={day} />
      )}
    </>
  );
};

export default StartExercise;
