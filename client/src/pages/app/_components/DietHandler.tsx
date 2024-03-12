import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { DietMealValidator, DietValidator } from "../validators/diet.validator";
import { useDispatch } from "react-redux";
import { setDietProperties } from "../reducers/appReducer";
import { useApp } from "../hooks/useApp";

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
  const dispatch = useDispatch();
  const { dietProperties } = useApp();
  const [mealName, setMealName] = useState(meals?.mealName || "");
  const [mealTime, setMealTime] = useState(meals?.mealTime || "");
  const [calories, setCalories] = useState(meals?.calories || 0);

  const _id = useMemo(() => {
    return uuid();
  }, []);

  useEffect(() => {
    if (mealName.length > 3 && mealTime.length > 3 && calories > 0) {
      dispatch(setDietProperties({ mealName, _id, calories, mealTime }));
    }
  }, [mealName, calories, mealTime]);
  useEffect(() => {
    if (dietProperties.length > 0) {
      setValue("mealProperties", dietProperties);
    }
  }, [dietProperties]);
  return (
    <>
      {formState.errors.mealProperties && (
        <p className="text-red-500 font-ubuntu text-[12px]">
          {formState.errors.mealProperties.message}
        </p>
      )}
      <div key={index} className="flex items-center gap-2">
        <div>
          <p className="font-roboto-mono max-[450px]:text-[10px]">
            Meal{index + 1} Name
          </p>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder={`meal${index + 1}Name`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
        <div>
          <p className="font-roboto-mono max-[450px]:text-[10px]">
            Meal{index + 1} Calories
          </p>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(parseInt(e.target.value))}
            placeholder={`meal${index + 1}Calories`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
        <div>
          <p className="font-roboto-mono max-[450px]:text-[10px]">Meal Time</p>
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
