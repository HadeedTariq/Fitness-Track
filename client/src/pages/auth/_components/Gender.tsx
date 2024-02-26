import { UseFormRegister } from "react-hook-form";
import { RegisterValidator } from "../validators/user.validator";

type GenderProps = {
  register: UseFormRegister<RegisterValidator>;
};
const Gender = ({ register }: GenderProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <div>
          <select
            {...register("gender")}
            className="mt-1.5 w-full rounded-sm border-gray-300 text-gray-700 sm:text-sm">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Gender;
