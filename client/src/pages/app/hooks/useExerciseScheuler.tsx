import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExerciseValidator,
  exerciseValidator,
} from "../validators/exerciseValidator";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { exercisesApi } from "../../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "../types/appTypes";

type HookProps = {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  setShowExercise: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useExerciseScheduler = ({ day, setShowExercise }: HookProps) => {
  const queryClient = useQueryClient();
  const { data: exercise, isLoading } = useQuery({
    queryKey: [`${day}Exercise`],
    queryFn: async () => {
      const { data } = await exercisesApi.get(`/${day}`);
      if (data !== null) {
        setShowExercise(true);
      }
      return data as Exercise;
    },
  });
  const toast = useToast();
  const { register, setValue, formState, reset, watch, handleSubmit } =
    useForm<ExerciseValidator>({
      resolver: zodResolver(exerciseValidator),
      values: {
        exerciseDay: exercise?.exerciseDay || day,
        exerciseName: exercise?.exerciseName || "",
        exercises: exercise?.exercises || 0,
        exerciseType: exercise?.exerciseType || "lower",
        properties: exercise?.setProperties || [],
      },
    });
  const sets = watch("exercises");

  const { mutate: createExercise, isPending } = useMutation({
    mutationKey: ["createExercise"],
    mutationFn: async (values: ExerciseValidator) => {
      const { data } = await exercisesApi.post("/create", values);
      toast({
        title: "Exercise created successfully" || data.message,
        status: "success",
        isClosable: true,
        duration: 1000,
      });
      reset();
    },
  });
  const { mutate: updateExercise, isPending: isUpdationPending } = useMutation({
    mutationKey: ["updateExercise"],
    mutationFn: async (values: ExerciseValidator) => {
      const properties = values.properties.filter(
        (_, index) => index + 1 <= values.exercises
      );
      const { data } = await exercisesApi.put("/update", {
        ...values,
        properties,
      });
      toast({
        title: "Exercise updated successfully" || data.message,
        status: "success",
        isClosable: true,
        duration: 1000,
      });
      reset();
    },
    onSuccess: () => {
      setShowExercise(true);
      queryClient.invalidateQueries(["exercise", 0] as InvalidateQueryFilters);
    },
  });

  const onSubmit = (values: ExerciseValidator) => {
    const realProperties = values.properties.map((property) => {
      delete property._id;
      return property;
    });
    const realExercise = { ...values, properties: realProperties };
    if (realExercise.exercises !== realExercise.properties.length) {
      toast({
        title: "Please fill all the properties",
        status: "warning",
        isClosable: true,
        duration: 1200,
      });
      return;
    }
    if (!exercise) {
      createExercise(realExercise);
    }
    if (exercise) {
      updateExercise(realExercise);
    }
  };
  return {
    mutations: { exercise, isLoading, isPending, isUpdationPending },
    form: {
      register,
      setValue,
      formState,
      reset,
      watch,
      handleSubmit,
      sets,
      onSubmit,
    },
  };
};
