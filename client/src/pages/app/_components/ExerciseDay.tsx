import ExerciseCreator, { ExerciseCreatorProps } from "./ExerciseCreator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ExerciseDay = () => {
  return (
    <Accordion type="single" collapsible className="w-[98%]">
      {days.map((day) => (
        <AccordionItem value={day}>
          <AccordionTrigger>{day}</AccordionTrigger>
          <AccordionContent className="px-1 py-3">
            <ExerciseCreator
              key={day}
              day={day as ExerciseCreatorProps["day"]}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ExerciseDay;
