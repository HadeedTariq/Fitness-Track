import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="flex flex-col items-center gap-2 py-3 fixed w-[180px] h-[94.1vh] border-r-2 border-purple-500">
      <Link
        to={"dashboard"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname.includes("dashboard")
            ? "bg-violet-500 scale-105"
            : "bg-purple-500"
        }`}>
        My Profile
      </Link>
      <Link
        to={"startExercise"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname === "/startExercise"
            ? "bg-violet-500 scale-105"
            : "bg-purple-500"
        }`}>
        Start Exercise
      </Link>
      <Link
        to={"exerciseSchedule"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname === "/exerciseSchedule"
            ? "bg-violet-500 scale-105"
            : "bg-purple-500"
        }`}>
        Exercise Schedule
      </Link>
      <Link
        to={"dietSchedule"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname === "/dietSchedule"
            ? "bg-violet-500 scale-105"
            : "bg-purple-500"
        }`}>
        Diet Schedule
      </Link>
    </div>
  );
};

export default SideBar;
