import ExerciseDay from "../_components/ExerciseDay";

const ExerciseSchedule = () => {
  return (
    <div className="flex flex-col items-center gap-3 w-full my-2">
      <ExerciseDay day="Monday" />
      <ExerciseDay day="Tuesday" />
      <ExerciseDay day="Wednesday" />
      <ExerciseDay day="Thursday" />
      <ExerciseDay day="Friday" />
      <ExerciseDay day="Saturday" />
      <ExerciseDay day="Sunday" />
    </div>
  );
};

export default ExerciseSchedule;
