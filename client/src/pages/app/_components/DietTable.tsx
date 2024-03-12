import { DietValidator } from "../validators/diet.validator";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

type DietTableProps = {
  diet: DietValidator & { _id: string; createdAt: string };
};

const DietTable = ({ diet }: DietTableProps) => {
  return (
    <div className="w-full gap-2 py-2 flex items-center flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold font-roboto-mono max-[500px]:text-[19px]">
          Today's Diet Schedule
        </h2>
        {diet.mealProperties?.map((property) => (
          <TableContainer key={property._id}>
            <Table variant="simple" border={"2px"} className="rounded-md">
              <Thead borderBottom={"2px"}>
                <Tr>
                  <Th
                    borderRight={"2px"}
                    textAlign={"center"}
                    fontSize={{ base: "10px", sm: "13px", md: "16px" }}
                    fontFamily={"revert-layer"}>
                    Meal name
                  </Th>
                  <Th
                    borderRight={"2px"}
                    textAlign={"center"}
                    fontSize={{ base: "10px", sm: "13px", md: "16px" }}
                    fontFamily={"revert-layer"}>
                    Meal Calories
                  </Th>
                  <Th
                    borderRight={"2px"}
                    textAlign={"center"}
                    fontSize={{ base: "10px", sm: "13px", md: "16px" }}
                    fontFamily={"revert-layer"}>
                    Meal Time
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
                    className="capitalize font-roboto-mono"
                    fontSize={{ base: "10px", sm: "13px", md: "16px" }}>
                    {property.mealName}
                  </Td>
                  <Td
                    textAlign={"center"}
                    borderBottom={"2px"}
                    borderRight={"2px"}
                    fontWeight={"500"}
                    className="capitalize font-roboto-mono"
                    fontSize={{ base: "10px", sm: "13px", md: "16px" }}>
                    {property.calories}
                  </Td>
                  <Td
                    textAlign={"center"}
                    borderBottom={"2px"}
                    borderRight={"2px"}
                    fontWeight={"500"}
                    className="capitalize font-roboto-mono"
                    fontSize={{ base: "10px", sm: "13px", md: "16px" }}>
                    {property.mealTime}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        ))}
      </div>
    </div>
  );
};

export default DietTable;
