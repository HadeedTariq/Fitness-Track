import { ArrowRightIcon, DropletIcon } from "lucide-react";

import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { planApi } from "@/utils/axios";
import { NoPlanAvailable } from "../_components/NoPlanAvailable";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
// Meal type
interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
}

interface Hydration {
  description: string;
  dailyGoal: number;
  tips: string[];
}

interface DietPlan {
  planName: string;
  description: string;
  dailyCalories: number;
  meals: Meal[];
  hydration: Hydration;
  motivationalAdvice: string[];
}
const DietSchedule = () => {
  const queryClient = useQueryClient();

  const { data: dietPlan, isLoading } = useQuery({
    queryKey: ["dietPlan"],
    queryFn: async () => {
      const { data } = await planApi.get("/diet");

      if (data.message) {
        return null;
      }

      return data as DietPlan;
    },
  });

  const { mutate: deleteDietPlan, isPending } = useMutation({
    mutationKey: ["deleteDietPlan"],
    mutationFn: async () => {
      const { data } = await planApi.delete("/delete-plan?planType=diet");
      return data;
    },
    onError: (err: any) => {
      toast({
        title: err.response.data.message || "Something went wrong",
        variant: "destructive",
        duration: 2000,
      });
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "Diet plan delete successfully",
        duration: 2000,
      });
      queryClient.invalidateQueries(["dietPlan"] as InvalidateQueryFilters);
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (!dietPlan) return <NoPlanAvailable />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          {dietPlan.planName}
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          {dietPlan.description}
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Daily Meal Schedule
          </h2>
          <p className="text-xl font-medium text-gray-800 mb-6">
            Target Daily Calories: {dietPlan.dailyCalories}
          </p>
          <div className="space-y-6">
            {dietPlan.meals.map((meal, index) => (
              <div
                key={index}
                className="border-l-4 border-green-500 pl-4 py-2"
              >
                <h3 className="text-xl font-semibold text-green-600">
                  {meal.name}
                </h3>
                <p className="text-gray-700 mt-2">{meal.description}</p>
                <div className="mt-2 flex space-x-4 text-sm text-gray-600">
                  <span>Calories: {meal.calories}</span>
                  <span>Protein: {meal.protein}g</span>
                  <span>Carbs: {meal.carbs}g</span>
                  <span>Fats: {meal.fats}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
            <DropletIcon className="mr-2" /> Hydration
          </h2>
          <p className="text-gray-700 mb-2">{dietPlan.hydration.description}</p>
          <p className="text-lg font-medium text-blue-800 mb-4">
            Daily Goal: {dietPlan.hydration.dailyGoal} liters
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {dietPlan.hydration.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
            Motivational Advice
          </h2>
          <ul className="space-y-3">
            {dietPlan.motivationalAdvice.map((advice, index) => (
              <li key={index} className="flex items-start">
                <ArrowRightIcon className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{advice}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          variant={"destructive"}
          disabled={isPending}
          className="m-4"
          onClick={() => deleteDietPlan()}
        >
          Delete Plan
        </Button>
      </div>
    </div>
  );
};

export default DietSchedule;
