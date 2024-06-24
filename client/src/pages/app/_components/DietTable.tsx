import { DietValidator } from "../validators/diet.validator";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DietTableProps = {
  diet: DietValidator & { _id: string; createdAt: string };
};

const DietTable = ({ diet }: DietTableProps) => {
  return (
    <>
      <Table>
        <TableCaption>Today's Diet Schedule</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Meal name</TableHead>
            <TableHead>Meal Calories</TableHead>
            <TableHead> Meal Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diet.mealProperties?.map((property) => (
            <TableRow key={property._id}>
              <TableCell className="font-medium">{property.mealName}</TableCell>
              <TableCell>{property.calories}</TableCell>
              <TableCell>{property.mealTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DietTable;
