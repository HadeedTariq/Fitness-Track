type ExerciseProperties = {
  setName: string;
  totalReps: number;
  eachSetReps: number;
  totalSets: number;
  _id: string;
};

type Exercise = {
  _id: string;
  exercises: number;
  setProperties: ExerciseProperties[];
  user: string;
  exerciseName: string;
  exerciseDay:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  exerciseType: "lower" | "upper";
  createdAt: string;
};

export { Exercise, ExerciseProperties };
