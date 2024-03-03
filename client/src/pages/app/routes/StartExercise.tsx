import { useQuery } from "@tanstack/react-query";
import { dayFormatter } from "../utils/dayFormatter";
import { exercisesApi } from "../../../utils/axios";
import { Exercise } from "../types/appTypes";
import WorkoutHandler from "../_components/WorkoutHandler";
import ExerciseNotCreatedYet from "../_components/ExerciseNotCreatedYet";

const StartExercise = () => {
  const date = new Date().getDay();
  const day = dayFormatter(date);
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
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {exercise ? (
        <WorkoutHandler exercise={exercise} />
      ) : (
        <ExerciseNotCreatedYet day={day} />
      )}
    </>
  );
};

export default StartExercise;
