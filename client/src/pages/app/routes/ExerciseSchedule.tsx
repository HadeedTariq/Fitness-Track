// import ExerciseDay from "../_components/ExerciseDay";

// const ExerciseSchedule = () => {
//   return (
//     <div className="flex flex-col items-center gap-3 w-full my-2">
//       <ExerciseDay day="Monday" />
//       <ExerciseDay day="Tuesday" />
//       <ExerciseDay day="Wednesday" />
//       <ExerciseDay day="Thursday" />
//       <ExerciseDay day="Friday" />
//       <ExerciseDay day="Saturday" />
//       <ExerciseDay day="Sunday" />
//     </div>
//   );
// };

// export default ExerciseSchedule;

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { planApi } from "@/utils/axios";
import { NoPlanAvailable } from "../_components/NoPlanAvailable";

interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  rest: number;
  description: string;
}

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

export default function ExerciseSchedule() {
  const { data: fitnessPlan, isPending } = useQuery({
    queryKey: ["fitnessPlan"],
    queryFn: async () => {
      const { data } = await planApi.get("/");

      return data as FitnessPlan;
    },
  });

  if (isPending) return <div>Loading...</div>;
  console.log(fitnessPlan);
  return (
    <>
      {fitnessPlan ? (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{fitnessPlan.planName}</CardTitle>
            <CardDescription>{fitnessPlan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between">
              <Badge variant="outline">
                Frequency: {fitnessPlan.frequency}
              </Badge>
              <Badge variant="outline">Duration: {fitnessPlan.duration}</Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Exercises</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Sets</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Rest (seconds)</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fitnessPlan.exercises.map((exercise, index) => (
                    <TableRow key={index}>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell>{exercise.sets}</TableCell>
                      <TableCell>{exercise.reps}</TableCell>
                      <TableCell>{exercise.rest}</TableCell>
                      <TableCell>{exercise.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="cardio">
                <AccordionTrigger>Cardio</AccordionTrigger>
                <AccordionContent>
                  <p>{fitnessPlan.cardio.description}</p>
                  <p className="mt-2">
                    <strong>Type:</strong> {fitnessPlan.cardio.type.join(", ")}
                  </p>
                  <p>
                    <strong>Frequency:</strong> {fitnessPlan.cardio.frequency}
                  </p>
                  <p>
                    <strong>Duration:</strong> {fitnessPlan.cardio.duration}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="nutrition">
                <AccordionTrigger>Nutrition</AccordionTrigger>
                <AccordionContent>
                  <p>{fitnessPlan.nutrition.description}</p>
                  <ul className="list-disc pl-5 mt-2">
                    {fitnessPlan.nutrition.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Motivational Advice
              </h3>
              <ul className="list-disc pl-5">
                {fitnessPlan.motivationalAdvice.map((advice, index) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <NoPlanAvailable />
      )}
    </>
  );
}
