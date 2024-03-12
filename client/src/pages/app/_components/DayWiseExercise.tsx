import { Exercise } from "../types/appTypes";

type DayWiseExerciseProps = {
  exercise: Exercise;
};

const DayWiseExercise = ({ exercise }: DayWiseExerciseProps) => {
  return (
    <div className="flex flex-col gap-3" key={exercise._id}>
      <h1 className="text-[25px] font-pt-serif text-center  capitalize font-bold">
        {" "}
        {exercise.exerciseName} Day
      </h1>
      <div className="flex items-center justify-between px-2 gap-2 max-[700px]:flex-col">
        <p className="text-[17px] font-kode-mono  bg-violet-500 shadow-violet-500 text-white shadow-md cursor-pointer hover:animate-bounce duration-500 rounded-md p-2 w-full">
          Total Exercises: {exercise.exercises}
        </p>
        <p className="text-[17px] font-kode-mono  bg-violet-500 shadow-violet-500 text-white shadow-md cursor-pointer hover:animate-bounce duration-500 rounded-md p-2 w-full">
          Body Part: {exercise.exerciseType}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {exercise.setProperties.map((property, index) => (
          <div className="flex flex-col gap-2 ">
            <p className="border-2 border-indigo-600 p-2 mx-3 rounded-md text-center font-[500] font-lato text-[20px]">
              {(index + 1 === 1 && "1st") ||
                (index + 1 === 2 && "2nd") ||
                (index + 1 === 3 && "3rd") ||
                (index + 1 > 3 && `${index + 1}th`)}{" "}
              Exercise
            </p>
            <div
              key={property._id}
              className="flex  items-center flex-wrap  gap-2 justify-between px-3">
              <p className="font-kode-mono text-[16px] font-semibold rounded-md bg-violet-500/90 w-[200px] max-[740px]:w-full max-[718px]:text-center max-[718px]:text-[14px] p-2 text-white">
                Set Name: {property.setName}
              </p>
              <p className="font-kode-mono text-[16px] font-semibold rounded-md bg-violet-500/90 w-[200px] max-[740px]:w-full max-[718px]:text-center max-[718px]:text-[14px] p-2 text-white">
                Total Sets: {property.totalSets}
              </p>
              <p className="font-kode-mono text-[16px] font-semibold rounded-md bg-violet-500/90 w-[200px] max-[740px]:w-full max-[718px]:text-center max-[718px]:text-[14px] p-2 text-white">
                Total Reps: {property.totalReps}
              </p>
              <p className="font-kode-mono text-[16px] font-semibold rounded-md bg-violet-500/90 w-[200px] max-[740px]:w-full max-[718px]:text-center max-[718px]:text-[14px] p-2 text-white">
                Each Set Rep: {property.eachSetReps}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayWiseExercise;
