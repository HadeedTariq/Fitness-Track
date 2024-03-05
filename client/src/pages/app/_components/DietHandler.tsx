import { useEffect, useState } from "react";
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { DietMealValidator, DietValidator } from "../validators/diet.validator";

type ExerciseHandlerProps = {
  index: number;
  register: UseFormRegister<DietValidator>;
  setValue: UseFormSetValue<DietValidator>;
  formState: FormState<DietValidator>;
  watch: UseFormWatch<DietValidator>;
  meals: DietMealValidator[0] | undefined;
};

const DietHandler = ({
  index,
  formState,
  meals,
  setValue,
}: ExerciseHandlerProps) => {
  const [mealName, setMealName] = useState(meals?.mealName || "");
  const [mealTime, setMealTime] = useState(meals?.mealTime || "");
  const [calories, setCalories] = useState(meals?.calories || 0);

  useEffect(() => {
    if (mealName.length > 3 && mealTime.length > 3 && calories > 0) {
    }
  }, [mealName, calories, mealTime]);
  return (
    <>
      {formState.errors.mealProperties && (
        <p className="text-red-500 font-ubuntu text-[12px]">
          {formState.errors.mealProperties.message}
        </p>
      )}
      <div key={index} className="flex items-center gap-2">
        <div>
          <p className="font-roboto-mono">Meal{index + 1} Name</p>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder={`meal${index + 1}Name`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
        <div>
          <p className="font-roboto-mono">Meal{index + 1} Calories</p>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(parseInt(e.target.value))}
            placeholder={`meal${index + 1}Calories`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
        <div>
          <p className="font-roboto-mono">Meal Time</p>
          <input
            type="text"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default DietHandler;
