import { Link } from "react-router-dom";

type ExerciseNotCreatedYetProps = {
  day: string | undefined;
};

const ExerciseNotCreatedYet = ({ day }: ExerciseNotCreatedYetProps) => {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh]">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold font-kode-mono">
          You have not created exercise for {day}
        </h1>
        <Link
          to={"/exerciseSchedule"}
          className="bg-purple-500 text-white rounded-md py-2 px-4 font-semibold text-xl font-ubuntu">
          Create
        </Link>
      </div>
    </div>
  );
};

export default ExerciseNotCreatedYet;
