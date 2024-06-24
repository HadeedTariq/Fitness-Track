import { useState, useRef } from "react";
import { useApp } from "../hooks/useApp";
import { Exercise } from "../types/appTypes";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { dailyExerciseApi } from "../../../utils/axios";
import { ErrResponse } from "../../../types/general";
import { toast } from "@/components/ui/use-toast";

type WorkoutTimerProps = {
  exercise: Exercise;
};

const WorkoutTimer = ({ exercise }: WorkoutTimerProps) => {
  const { completedExercises } = useApp();
  const [timerOn, setTimerOn] = useState(false);
  const initialTime = JSON.parse(localStorage.getItem("workoutTime") as string);
  const [time, setTime] = useState({
    minutes: initialTime?.minutes || 0,
    seconds: initialTime?.seconds || 0,
  });
  const intervalRef = useRef<any>();

  const startTimer = () => {
    if (!timerOn) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = {
            ...prevTime,
            seconds: prevTime.seconds + 1,
          };
          if (newTime.seconds === 60) {
            newTime.minutes += 1;
            newTime.seconds = 0;
          }
          localStorage.setItem("workoutTime", JSON.stringify(newTime));
          return newTime;
        });
      }, 1000);
      setTimerOn(true);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimerOn(false);
  };
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimerOn(false);
    setTime({ minutes: 0, seconds: 0 });
    localStorage.removeItem("workoutTime");
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["completeTodayExercise"],
    mutationFn: async () => {
      const { data } = await dailyExerciseApi.post("/done", {
        exerciseTimeInSeconds: initialTime.seconds,
        exerciseTimeInMinutes: initialTime.minutes,
        exerciseName: exercise.exerciseName,
      });
      toast({
        title: "Exercise Completed successfully" || data.message,
      });
    },
    onSuccess: () => {
      localStorage.removeItem("completedExercises");
      localStorage.removeItem("workoutTime");
      queryClient.invalidateQueries([
        "dailyExercise",
        0,
      ] as InvalidateQueryFilters);
    },
    onError: (err: ErrResponse) => {
      toast({
        title: err.response.data.message || "Time must be more than 1 minute",
        variant: "destructive",
      });
    },
  });
  const workoutCompleted = () => {
    clearInterval(intervalRef.current);
    setTimerOn(false);
    mutate();
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Workout Time</h1>
        <div className="text-2xl">
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
          {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={startTimer}>
            Start
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={stopTimer}>
            Pause
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
      <button
        disabled={
          completedExercises.length !== exercise.setProperties.length ||
          isPending
        }
        onClick={workoutCompleted}
        className="bg-violet-500 disabled:bg-violet-300  py-1 px-12 text-[19px] font-roboto-mono text-white rounded-md mx-auto  font-medium ">
        Workout Completed
      </button>
    </>
  );
};

export default WorkoutTimer;
