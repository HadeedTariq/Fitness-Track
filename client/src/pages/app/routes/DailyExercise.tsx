import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useApp } from "../hooks/useApp";

import { useExerciseSchedule } from "../hooks/useExerciseScheuler";
import RestDay from "../_components/RestDay";
import { Navigate } from "react-router-dom";

const DailyExercisePage: React.FC = () => {
  const { isLoading, isError } = useExerciseSchedule();
  const { todayExercises: exercises } = useApp();

  const [completedExercises, setCompletedExercises] = useState<
    Record<string, boolean>
  >({});

  const handleExerciseCompletion = (exerciseId: string) => {
    if (completedExercises[exerciseId]) {
      return;
    }
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: true,
    }));
  };
  if (isLoading) return <h1>Loading...</h1>;
  if (exercises.length < 1 || isError) return <Navigate to={"/dashboard"} />;

  return (
    <>
      {exercises?.[0].name === "Rest Day" ? (
        <RestDay exercise={exercises?.[0]} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 ml-0">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
              Daily Exercise Plan
            </h1>
            <div className="space-y-6">
              {exercises.map((exercise) => (
                <Card
                  key={exercise._id}
                  className={`${
                    completedExercises[exercise._id]
                      ? "bg-green-50"
                      : "bg-white"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{exercise.name}</span>
                      <Button
                        variant={
                          completedExercises[exercise._id]
                            ? "outline"
                            : "default"
                        }
                        size="sm"
                        onClick={() => handleExerciseCompletion(exercise._id)}
                      >
                        {completedExercises[exercise._id]
                          ? "Completed"
                          : "Mark Complete"}
                      </Button>
                    </CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      <strong>{exercise.sets}</strong> sets of{" "}
                      <strong>{exercise.reps}</strong> reps
                    </p>
                    <p className="text-sm text-gray-600">
                      Rest: <strong>{exercise.rest}</strong> seconds
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyExercisePage;
