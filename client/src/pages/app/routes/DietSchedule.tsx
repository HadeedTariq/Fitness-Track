import DietHandler from "../_components/DietHandler";
import { useState } from "react";
import DietTable from "../_components/DietTable";
import { useDietSchedule } from "../hooks/useDietSchedule";

const DietSchedule = () => {
  const [showDiet, setShowDiet] = useState(true);

  const {
    mutations: { isDietCreationPending, isDietUpdationPending },
    form: {
      register,
      formState,
      watch,
      handleSubmit,
      setValue,
      totalMeals,
      onSubmit,
    },
    query: { diet, isLoading },
  } = useDietSchedule({ setShowDiet });

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="overflow-x-hidden">
      {diet && showDiet ? (
        <div className="flex flex-col items-center w-full mx-1">
          <DietTable diet={diet} />
          <button
            className="bg-violet-500 font-lato p-2 text-[18px] text-white rounded-md w-[200px] font-semibold hover:bg-violet-600/90 transition duration-300 disabled:bg-violet-400"
            onClick={() => setShowDiet(false)}>
            Update Diet
          </button>
        </div>
      ) : (
        <form
          className="flex flex-col items-center gap-2 p-2 w-full mx-1"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full gap-2 flex">
            <div className="w-full flex flex-col">
              <p>Total Meals</p>
              <input
                value={watch("totalMeals")}
                onChange={(e) =>
                  setValue("totalMeals", parseInt(e.target.value))
                }
                type="number"
                placeholder="Total Meals"
                className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
              />
              {formState.errors.totalMeals && (
                <p className="text-red-500 font-ubuntu text-[12px]">
                  {formState.errors.totalMeals.message}
                </p>
              )}
              <div className="flex flex-col gap-2 items-center mt-2">
                {Array.from({ length: totalMeals })?.map((_, index) => (
                  <DietHandler
                    meals={diet?.mealProperties[index]}
                    key={index}
                    index={index}
                    register={register}
                    setValue={setValue}
                    formState={formState}
                    watch={watch}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={
              formState.disabled ||
              isDietCreationPending ||
              isDietUpdationPending
            }
            className="bg-violet-500 font-lato p-2 text-[18px] text-white rounded-md w-full font-semibold hover:bg-violet-600/90 transition duration-300 disabled:bg-violet-400">
            {!diet ? "Create" : "Update"}
          </button>
        </form>
      )}
    </div>
  );
};

export default DietSchedule;
