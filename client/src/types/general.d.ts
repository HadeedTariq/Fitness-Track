type User = {
  username: string;
  email: string;
  avatar?: string;
  weight: string;
  age: string;
  height: string;
  gender: string;
  bmi: string;
  createdAt: string;
};

type ErrResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

interface Cardio {
  description: string;
  type: string[];
  frequency: string;
  duration: string;
}

interface Nutrition {
  description: string;
  tips: string[];
}

interface FitnessPlan {
  planName: string;
  description: string;
  frequency: string;
  duration: string;
  exercises: Exercise[];
  cardio: Cardio;
  nutrition: Nutrition;
  motivationalAdvice: string[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  rest: number;
  description: string;
  day: string;
  _id: string;
}

export { User, ErrResponse, Exercise, FitnessPlan };
