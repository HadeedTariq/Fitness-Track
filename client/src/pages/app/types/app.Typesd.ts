export type ExerciseProperties = {
  setName: string;
  totalReps: number;
  eachSetReps: number;
  totalSets: number;
  _id: string;
};

export type Exercise = {
  _id: string;
  exercises: number;
  setProperties: ExerciseProperties[];
  user: string;
  exerciseName: string;
  exerciseDay: string;
  exerciseType: string;
  createdAt: string;
};
