import { useEffect, useMemo, useState } from "react";
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ExerciseValidator } from "../validators/exerciseValidator";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { setProperties } from "../reducers/appReducer";
import { useApp } from "../hooks/useApp";
import { Exercise } from "../types/appTypes";

type ExerciseHandlerProps = {
  index: number;
  register: UseFormRegister<ExerciseValidator>;
  setValue: UseFormSetValue<ExerciseValidator>;
  formState: FormState<ExerciseValidator>;
  watch: UseFormWatch<ExerciseValidator>;
  property: Exercise["setProperties"][0] | undefined;
};

const ExerciseHandler = ({
  index,
  setValue,
  formState,
  property,
}: ExerciseHandlerProps) => {
  const { exerciseProperties } = useApp();
  const [nameOfSet, setNameOfSet] = useState(property?.setName || "");
  const [totalSets, setTotalSets] = useState(property?.totalSets || 0);
  const [totalReps, setTotalReps] = useState(property?.totalReps || 0);
  const [eachSetReps, setEachSetReps] = useState(property?.eachSetReps || 0);
  const dispatch = useDispatch();
  const _id = useMemo(() => {
    return uuid();
  }, []);
  useEffect(() => {
    if (totalReps > 0 && totalSets > 0) {
      const eachSetReps = Math.floor(totalReps / totalSets);
      setEachSetReps(eachSetReps);
    } else {
      setEachSetReps(0);
    }
  }, [totalSets, totalReps]);
  useEffect(() => {
    if (totalReps > 0 && totalSets > 0 && eachSetReps > 0 && nameOfSet) {
      dispatch(
        setProperties({
          totalReps,
          totalSets,
          eachSetReps,
          setName: nameOfSet,
          _id,
        })
      );
    }
  }, [nameOfSet, totalSets, totalReps, eachSetReps]);
  useEffect(() => {
    setValue("properties", exerciseProperties);
  }, [exerciseProperties]);
  return (
    <>
      {formState.errors.properties && (
        <p className="text-red-500 font-ubuntu text-[12px]">
          {formState.errors.properties.message}
        </p>
      )}
      <div key={index} className="flex items-center gap-2">
        <div>
          <p className="font-roboto-mono max-[880px]:text-[10px]">
            Set{index + 1} Name
          </p>
          <input
            type="text"
            value={nameOfSet}
            onChange={(e) => setNameOfSet(e.target.value)}
            placeholder={`set${index + 1}Name`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
        <div>
          <p className="font-roboto-mono max-[880px]:text-[10px]">
            Set{index + 1} Reps
          </p>
          <input
            type="number"
            value={totalReps}
            onChange={(e) => setTotalReps(parseInt(e.target.value))}
            placeholder={`set${index + 1}Reps`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
        <div>
          <p className="font-roboto-mono max-[880px]:text-[10px]">
            Each Set Reps
          </p>
          <input
            type="number"
            value={eachSetReps}
            readOnly
            placeholder={`eachSetReps`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
        <div>
          <p className="font-roboto-mono max-[880px]:text-[10px]">Total Sets</p>
          <input
            type="number"
            value={totalSets}
            onChange={(e) => {
              setTotalSets(parseInt(e.target.value));
            }}
            placeholder={`totalSets`}
            className="border-2 border-pink-300 outline-pink-600 w-full p-1 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default ExerciseHandler;
