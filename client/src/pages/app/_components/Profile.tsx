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
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
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
            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>Your Posts</CardTitle>
                  <CardDescription>
                    You haven't made any posts yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Start sharing your fitness journey by creating your first
                    post!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    Track your fitness journey over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    No progress data available yet. Keep working towards your
                    goals!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
