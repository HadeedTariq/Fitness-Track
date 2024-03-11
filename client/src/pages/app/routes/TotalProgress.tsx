import { useState } from "react";
import { useApp } from "../hooks/useApp";

import { AgChartsReact } from "ag-charts-react";

const TotalProgress = () => {
  const { myOverAllProgress } = useApp();
  function getData() {
    return myOverAllProgress;
  }

  const [options, setOptions] = useState({
    title: {
      text: "My Workout Total Progress",
    },
    data: getData(),
    series: [
      {
        type: "bar",
        xKey: "exerciseName",
        yKey: "exerciseTimeInMinutes",
        yName: "Exercise Time In Minutes",
      },
      {
        type: "bar",
        xKey: "exerciseTimeInSeconds",
        yKey: "exerciseTimeInSeconds",
        yName: "Exercise Time In Seconds",
      },
    ],
  });

  return <AgChartsReact options={options} />;
};

export default TotalProgress;
