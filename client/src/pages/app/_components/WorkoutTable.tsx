import { useDispatch } from "react-redux";
import { Exercise } from "../types/appTypes";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useApp } from "../hooks/useApp";
import { setCompletedExercises } from "../reducers/appReducer";
import { IoIosCloudDone } from "react-icons/io";

type WorkoutTableProps = {
  property: Exercise["setProperties"][0];
  index: number;
};

const WorkoutTable = ({ property, index }: WorkoutTableProps) => {
  const { completedExercises } = useApp();
  const dispatch = useDispatch();
  return (
    <TableContainer mr={"3px"}>
      <Table variant="simple" border={"2px"} className="rounded-md">
        <Thead borderBottom={"2px"}>
          <Tr>
            <Th
              borderRight={"2px"}
              textAlign={"center"}
              fontSize={"16px"}
              fontFamily={"revert-layer"}>
              Set name
            </Th>
            <Th
              borderRight={"2px"}
              textAlign={"center"}
              fontSize={"16px"}
              fontFamily={"revert-layer"}>
              Total Sets
            </Th>
            <Th
              borderRight={"2px"}
              textAlign={"center"}
              fontSize={"16px"}
              fontFamily={"revert-layer"}>
              Total Reps
            </Th>
            <Th
              borderRight={"2px"}
              textAlign={"center"}
              fontSize={"16px"}
              fontFamily={"revert-layer"}>
              Each set Reps
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td
              textAlign={"center"}
              borderBottom={"2px"}
              borderRight={"2px"}
              fontWeight={"500"}
              className="capitalize font-roboto-mono">
              {property.setName}
            </Td>
            <Td
              textAlign={"center"}
              borderBottom={"2px"}
              borderRight={"2px"}
              fontWeight={"500"}
              className="capitalize font-roboto-mono">
              {property.totalSets}
            </Td>
            <Td
              textAlign={"center"}
              borderBottom={"2px"}
              borderRight={"2px"}
              fontWeight={"500"}
              className="capitalize font-roboto-mono">
              {property.totalReps}
            </Td>
            <Td
              textAlign={"center"}
              borderBottom={"2px"}
              borderRight={"2px"}
              fontWeight={"500"}
              className="capitalize font-roboto-mono">
              {property.eachSetReps}
            </Td>
          </Tr>
        </Tbody>
      </Table>
      {completedExercises[index] &&
      completedExercises[index] === property._id ? (
        <div className="flex items-center gap-2 w-full border-2 border-green-500 p-2 justify-center">
          <IoIosCloudDone color="green" size={28} />
          <p className="text-[19px] font-pt-serif font-semibold">Completed</p>
        </div>
      ) : (
        <button
          onClick={() => dispatch(setCompletedExercises(property._id))}
          className="bg-violet-500  py-1 px-4 text-[19px] font-roboto-mono text-white rounded-md mx-auto w-full font-semibold">
          Done
        </button>
      )}
    </TableContainer>
  );
};

export default WorkoutTable;
