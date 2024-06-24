import { useDispatch } from "react-redux";
import { Exercise } from "../types/appTypes";
import { TableCell, TableRow } from "@/components/ui/table";
import { useApp } from "../hooks/useApp";
import { setCompletedExercises } from "../reducers/appReducer";
import { IoIosCloudDone } from "react-icons/io";
import { Button } from "@/components/ui/button";

type WorkoutTableProps = {
  property: Exercise["setProperties"][0];
  index: number;
};

const WorkoutTable = ({ property, index }: WorkoutTableProps) => {
  const { completedExercises } = useApp();
  const dispatch = useDispatch();
  return (
    <>
      <TableRow key={property._id}>
        <TableCell className="font-medium">{property.setName}</TableCell>
        <TableCell>{property.totalSets}</TableCell>
        <TableCell>{property.totalReps}</TableCell>
        <TableCell>{property.eachSetReps}</TableCell>
      </TableRow>

      {completedExercises[index] &&
      completedExercises[index] === property._id ? (
        <div className="flex  items-center gap-2 w-full border-2 border-green-500 p-2 justify-center">
          <IoIosCloudDone color="green" size={28} />
          <p className="text-[19px] font-pt-serif font-semibold">Completed</p>
        </div>
      ) : (
        <Button
          variant={"real"}
          onClick={() => dispatch(setCompletedExercises(property._id))}
          className="font-roboto-mono mx-auto">
          Done
        </Button>
      )}
    </>
  );
};

export default WorkoutTable;
