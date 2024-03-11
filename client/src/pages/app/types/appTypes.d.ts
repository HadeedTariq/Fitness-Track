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
type Post = {
  title: string;
  _id: string;
  description: string;
  comments: Array;
};
type OverAllProgress = {
  exerciseTimeInMinutes: number;
  exerciseTimeInSeconds: number;
  exerciseName: string;
  _id: string;
  createdAt: string;
};
type UserProfile = {
  username: string;
  email: string;
  weight: string;
  age: string;
  height: string;
  gender: string;
  bmi: string;
  createdAt: string;
  updatedAt: string;
  myPosts: Post[];
  overAOlProgress: overAllProgress[];
};

export { Exercise, ExerciseProperties, UserProfile };
