import { useApp } from "../hooks/useApp";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDateDay } from "../utils/dayFormatter";

const TotalProgress = () => {
  const { myOverAllProgress } = useApp();

  const chartData = myOverAllProgress.map((progress) => {
    const [day, date] = getDateDay(progress.createdAt);
    return { ...progress, createdAt: day, exerciseDate: String(date) };
  });

  return (
    <ResponsiveContainer
      className={"mx-2 max-[650px]:overflow-x-scroll max-[650px]:w-[110vw] "}
      width="98%"
      height="100%"
      maxHeight={1000}
      minWidth={500}>
      <AreaChart
        className="w-[200px] h-[200px]"
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"exerciseDate"} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="createdAt"
          stroke="green"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="exerciseName"
          stroke="blue"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="exerciseTimeInMinutes"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="exerciseTimeInSeconds"
          stroke="red"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TotalProgress;
