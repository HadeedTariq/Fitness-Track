import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex flex-col fixed w-[180px] h-[94.1vh] border-r-2 border-purple-500">
      <Link to={"startExercise"}>Start Exercise</Link>
      <Link to={"exerciseSchedule"}>Exercise Schedule</Link>
    </div>
  );
};

export default SideBar;
