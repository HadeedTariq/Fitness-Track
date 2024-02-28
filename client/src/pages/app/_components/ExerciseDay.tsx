import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ExerciseCreator from "./ExerciseCreator";

type ExerciseDayProps = {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
};

const ExerciseDay = ({ day }: ExerciseDayProps) => {
  const [show, setShow] = useState<"up" | "down">("down");
  return (
    <div className="border-2 rounded-md p-2 w-[80%] border-purple-500">
      <div className="flex items-center justify-between">
        <p>{day}</p>
        {show === "up" && (
          <IoIosArrowUp
            size={25}
            cursor={"pointer"}
            onClick={() => setShow("down")}
          />
        )}
        {show === "down" && (
          <IoIosArrowDown
            size={25}
            cursor={"pointer"}
            onClick={() => setShow("up")}
          />
        )}
      </div>
      {show === "up" && <ExerciseCreator day={day} />}
    </div>
  );
};

export default ExerciseDay;
