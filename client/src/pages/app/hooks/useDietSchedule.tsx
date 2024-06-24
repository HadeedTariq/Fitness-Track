import { useForm } from "react-hook-form";
import { DietValidator, dietValidator } from "../validators/diet.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { dietApi } from "../../../utils/axios";
import { useEffect } from "react";
import { setDietPropertiesEmpty } from "../reducers/appReducer";
import { useDispatch } from "react-redux";
import { ErrResponse } from "../../../types/general";
import { toast } from "@/components/ui/use-toast";

export const useDietSchedule = ({
  setShowDiet,
}: {
  setShowDiet: (val: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { data: diet, isLoading } = useQuery({
    queryKey: ["getUserDiet"],
    queryFn: async () => {
      const { data } = await dietApi.get("/");
      if (data !== null) {
        return data as DietValidator & { _id: string; createdAt: string };
      } else {
        setShowDiet(false);
        return null;
      }
    },
  });

  const { register, formState, watch, handleSubmit, setValue, reset } =
    useForm<DietValidator>({
      resolver: zodResolver(dietValidator),
      values: {
        totalMeals: diet?.totalMeals || 0,
        mealProperties: diet?.mealProperties || [],
      },
    });

  const { mutate: createDiet, isPending: isDietCreationPending } = useMutation({
    mutationKey: ["createDiet"],
    mutationFn: async (diet: DietValidator) => {
      const { data } = await dietApi.post("/create", diet);
      toast({
        title: "Diet Created successfully" || data.message,
      });
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries([
        "getUserDiet",
        0,
      ] as InvalidateQueryFilters);
    },
    onError: (err: ErrResponse) => {
      toast({
        title: err.response.data.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const { mutate: updateDiet, isPending: isDietUpdationPending } = useMutation({
    mutationKey: ["updateDiet"],
    mutationFn: async (diet: DietValidator) => {
      const { data } = await dietApi.put("/update", diet);
      toast({
        title: "Diet Updated successfully" || data.message,
      });
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries([
        "getUserDiet",
        0,
      ] as InvalidateQueryFilters);
    },
    onError: (err: ErrResponse) => {
      toast({
        title: err.response.data.message || "Something went wrong",
        variant: "destructive",
      });
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
    if (!diet) {
      createDiet({ ...values, mealProperties: diet });
    } else {
      updateDiet({ ...values, mealProperties: diet });
    }
  };

  useEffect(() => {
    dispatch(setDietPropertiesEmpty());
  }, [totalMeals]);

  return {
    mutations: {
      isDietCreationPending,
      isDietUpdationPending,
    },
    form: {
      register,
      formState,
      watch,
      handleSubmit,
      setValue,
      onSubmit,
      totalMeals,
    },
    query: {
      diet,
      isLoading,
    },
  };
};
