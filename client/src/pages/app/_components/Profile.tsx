import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Mail, Ruler, Scale, User } from "lucide-react";
import { UserProfile } from "../types/appTypes";
import { ExercisePlanCreator } from "./ExercisePlanCreator";
import { DietPlanCreator } from "./DietPlanCreator";

import { useQuery } from "@tanstack/react-query";
import { dailyExerciseApi } from "@/utils/axios";
import WeeklyProgressBar from "./ProgressTab";

export default function ProfileDashboard({
  profile,
}: {
  profile: UserProfile;
}) {
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const bmiCategory = getBMICategory(parseFloat(profile.bmi));
  const { data: progress, isLoading } = useQuery({
    queryKey: ["progressData"],
    queryFn: async () => {
      const { data } = await dailyExerciseApi.get("/progress");
      console.log(data);

      return data;
    },
  });

  if (isLoading) return <h1>Loading..</h1>;

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${profile.username}`}
            />
            <AvatarFallback>
              {profile.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl">{profile.username}</CardTitle>
            <CardDescription className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4" />
              {profile.email}
            </CardDescription>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <Badge variant="secondary">
                <User className="w-3 h-3 mr-1" />
                {profile.gender}
              </Badge>
              <Badge variant="secondary">
                <CalendarDays className="w-3 h-3 mr-1" />
                {profile.age}
              </Badge>
              <Badge variant="secondary">
                <Ruler className="w-3 h-3 mr-1" />
                {profile.height}
              </Badge>
              <Badge variant="secondary">
                <Scale className="w-3 h-3 mr-1" />
                {profile.weight}
              </Badge>
            </div>
            <ExercisePlanCreator />
            <DietPlanCreator />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>BMI Overview</CardTitle>
                  <CardDescription>
                    Your current Body Mass Index (BMI) is {profile.bmi}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>BMI Category:</span>
                      <Badge
                        variant={
                          bmiCategory === "Normal weight"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {bmiCategory}
                      </Badge>
                    </div>
                    <Progress
                      value={parseFloat(profile.bmi) * 2}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress">
              {progress ? (
                <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                      Your 12-Week Exercise Progress
                    </h1>
                    <WeeklyProgressBar
                      planDurationWeeks={progress.planDurationWeeks}
                      progress={progress.progress}
                    />
                    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">
                          Progress Details
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Detailed breakdown of your weekly progress.
                        </p>
                      </div>
                      <div className="border-t border-gray-200">
                        <dl>
                          {progress.progress?.map(
                            (week: any, index: number) => (
                              <div
                                key={week.week}
                                className={
                                  index % 2 === 0
                                    ? "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                    : "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                }
                              >
                                <dt className="text-sm font-medium text-gray-500">
                                  Week {week.week}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  Completed {week.completedExercises} out of{" "}
                                  {week.totalExercises} exercises
                                  <span
                                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      week.status === "green"
                                        ? "bg-green-100 text-green-800"
                                        : week.status === "yellow"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {week.status === "green"
                                      ? "Completed"
                                      : week.status === "yellow"
                                      ? "In Progress"
                                      : "Low Progress"}
                                  </span>
                                </dd>
                              </div>
                            )
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Please create exercise plan</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
