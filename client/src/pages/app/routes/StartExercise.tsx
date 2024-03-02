import { useQuery } from "@tanstack/react-query";
import { dayFormatter } from "../utils/dayFormatter";
import { exercisesApi } from "../../../utils/axios";
import { Exercise } from "../types/appTypes";

const StartExercise = () => {
  const date = new Date().getDay();
  const day = dayFormatter(date);
  const { data: exercise, isLoading } = useQuery({
    queryKey: [`${day}Exercise`],
    queryFn: async () => {
      const { data } = await exercisesApi.get(`/${day}`);
      console.log(data);
      return data as Exercise;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  return <div>Str</div>;
};

export default StartExercise;
