import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WeekProgress {
  week: number;
  totalExercises: number;
  completedExercises: number;
  status: "green" | "yellow" | "red";
}

interface ProgressBarProps {
  planDurationWeeks: number;
  progress: WeekProgress[];
}

export default function WeeklyProgressBar({
  planDurationWeeks,
  progress,
}: ProgressBarProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const calculateOverallProgress = () => {
    const totalCompleted = progress.reduce(
      (sum, week) => sum + week.completedExercises,
      0
    );
    const totalExercises = progress.reduce(
      (sum, week) => sum + week.totalExercises,
      0
    );
    return (totalCompleted / totalExercises) * 100;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Weekly Progress</h2>
      <Progress value={calculateOverallProgress()} className="mb-6" />
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Week 1</span>
        <span className="text-sm font-medium text-gray-600">
          Week {planDurationWeeks}
        </span>
      </div>
      <div className="flex h-4 mb-4">
        {Array.from({ length: planDurationWeeks }).map((_, index) => {
          const weekProgress = progress.find((p) => p.week === index + 1);
          const status = weekProgress ? weekProgress.status : "gray";
          const color = getStatusColor(status);

          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex-1 ${color} border-r border-white last:border-r-0`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Week {index + 1}</p>
                  {weekProgress && (
                    <>
                      <p>
                        Completed: {weekProgress.completedExercises}/
                        {weekProgress.totalExercises}
                      </p>
                      <p>Status: {weekProgress.status}</p>
                    </>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          Completed
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          In Progress
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          Low Progress
        </div>
      </div>
    </div>
  );
}
