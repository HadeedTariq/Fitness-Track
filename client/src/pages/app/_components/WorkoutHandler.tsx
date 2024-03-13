import { Exercise } from "../types/appTypes";
import WorkoutTable from "./WorkoutTable";
import { useState } from "react";
import WorkoutTimer from "./WorkoutTimer";

type WorkoutHandlerProps = {
  exercise: Exercise;
};

const WorkoutHandler = ({ exercise }: WorkoutHandlerProps) => {
  const [startExercise, setStartExercise] = useState(false);
  return (
    <div className="w-full gap-2 py-2 flex items-center flex-col">
      <h3 className="text-2xl font-semibold font-lato text-center">
        Welcome back Today is {exercise.exerciseDay} Are you ready for your{" "}
        {exercise.exerciseName} exercise
      </h3>
      <p className="text-xl font-semibold font-pt-serif  flex items-center gap-1 justify-center">
        We hope you are energetic for your {exercise.exerciseName} exercise{" "}
      </p>
      {!startExercise && (
        <button
          onClick={() => setStartExercise(true)}
          className="bg-violet-500  py-1 px-4 text-[19px] font-roboto-mono text-white rounded-md mx-auto  font-medium">
          Start Exercise
        </button>
      )}
      {startExercise && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold font-roboto-mono ">
            Today's Schedule
          </h2>
          {exercise.setProperties?.map((property, index) => (
            <WorkoutTable
              property={property}
              index={index}
              key={property._id}
            />
          ))}
        </div>
      )}
      {startExercise && (
        <div className="flex flex-col gap-3">
          <WorkoutTimer exercise={exercise} />
        </div>
      )}
    </div>
  );
};

export default WorkoutHandler;
