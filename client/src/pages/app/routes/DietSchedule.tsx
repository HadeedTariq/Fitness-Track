import { useForm } from "react-hook-form";
import { DietValidator, dietValidator } from "../validators/diet.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import DietHandler from "../_components/DietHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dietApi } from "../../../utils/axios";
import { useEffect } from "react";
import { setDietPropertiesEmpty } from "../reducers/appReducer";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const DietSchedule = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { data: diet } = useQuery({
    queryKey: ["getUserDiet"],
    queryFn: async () => {
      const { data } = await dietApi.get("/");
      if (data !== null) {
        return data as DietValidator;
      } else {
        return null;
      }
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createDiet"],
    mutationFn: async (diet: DietValidator) => {
      const { data } = await dietApi.post("/create", diet);
      toast({
        title: "Diet Created successfully" || data.message,
        isClosable: true,
        status: "success",
      });
    },
  });

  const { register, formState, watch, handleSubmit, setValue } =
    useForm<DietValidator>({
      resolver: zodResolver(dietValidator),
      values: {
        totalMeals: diet?.totalMeals || 0,
        mealProperties: diet?.mealProperties || [],
      },
    });

  const totalMeals = watch("totalMeals");
  console.log(totalMeals);
  const onSubmit = (values: DietValidator) => {
    console.log(values);
    const diet = values.mealProperties.map((meal) => {
      delete meal._id;
      return meal;
    });
    mutate({ ...values, mealProperties: diet });
  };

  useEffect(() => {
    dispatch(setDietPropertiesEmpty());
  }, [totalMeals]);
  return (
    <>
      <form
        className="flex flex-col items-center gap-2 p-2 w-full"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full gap-2 flex">
          <div className="w-full flex flex-col">
            <p>Total Meals</p>
            <input
              value={watch("totalMeals")}
              onChange={(e) => setValue("totalMeals", parseInt(e.target.value))}
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
          disabled={formState.disabled || isPending}
          className="bg-violet-500 font-lato p-2 text-[18px] text-white rounded-md w-full font-semibold hover:bg-violet-600/90 transition duration-300 disabled:bg-violet-400">
          {"Create"}
        </button>
      </form>
    </>
  );
};

export default DietSchedule;
