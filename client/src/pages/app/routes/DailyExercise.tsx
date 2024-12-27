import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number | string;
  rest: number;
  description: string;
  day: string;
}

// Mock data for demonstration
const mockExercises: Exercise[] = [
  {
    id: "1",
    name: "Push-ups",
    sets: 3,
    reps: 15,
    rest: 60,
    description: "Standard push-ups to target chest, shoulders, and triceps.",
    day: "Monday",
  },
  {
    id: "2",
    name: "Squats",
    sets: 4,
    reps: 12,
    rest: 90,
    description: "Bodyweight squats to strengthen legs and core.",
    day: "Monday",
  },
  {
    id: "3",
    name: "Plank",
    sets: 3,
    reps: "30 seconds",
    rest: 45,
    description: "Hold a plank position to engage core muscles.",
    day: "Monday",
  },
];

const DailyExercisePage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>(
    {}
  );
  const [completedExercises, setCompletedExercises] = useState<
    Record<string, boolean>
  >({});

  const handleSetCompletion = (exerciseId: string, setIndex: number) => {
    setCompletedSets((prev) => {
      const exerciseSets =
        prev[exerciseId] ||
        new Array(exercises.find((e) => e.id === exerciseId)?.sets || 0).fill(
          false
        );
      exerciseSets[setIndex] = !exerciseSets[setIndex];
      return { ...prev, [exerciseId]: exerciseSets };
    });
  };

  const handleExerciseCompletion = (exerciseId: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
    setCompletedSets((prev) => ({
      ...prev,
      [exerciseId]: new Array(
        exercises.find((e) => e.id === exerciseId)?.sets || 0
      ).fill(true),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Daily Exercise Plan
        </h1>
        <div className="space-y-6">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className={`${
                completedExercises[exercise.id] ? "bg-green-50" : "bg-white"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{exercise.name}</span>
                  <Button
                    variant={
                      completedExercises[exercise.id] ? "outline" : "default"
                    }
                    size="sm"
                    onClick={() => handleExerciseCompletion(exercise.id)}
                  >
                    {completedExercises[exercise.id]
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                </CardTitle>
                <CardDescription>{exercise.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {exercise.sets} sets of {exercise.reps} reps
                </p>
                <p className="text-sm text-gray-600">
                  Rest: {exercise.rest} seconds
                </p>
                <div className="mt-4 flex space-x-2">
                  {Array.from({ length: exercise.sets }).map((_, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`w-8 h-8 p-0 ${
                        completedSets[exercise.id]?.[index]
                          ? "bg-green-100"
                          : ""
                      }`}
                      onClick={() => handleSetCompletion(exercise.id, index)}
                    >
                      {completedSets[exercise.id]?.[index] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyExercisePage;
