import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="flex flex-col items-center gap-2 py-3 fixed w-[180px] max-[700px]:w-[92%] h-[94.1vh] border-r-2 border-red-500">
      <Link
        to={"dashboard"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname.includes("dashboard") ? "bg-red-500 " : "bg-red-600"
        }`}
      >
        My Profile
      </Link>
      <Link
        to={"exerciseSchedule"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname === "/exerciseSchedule" ? "bg-red-500 " : "bg-red-600"
        }`}
      >
        Exercise Schedule
      </Link>
      <Link
        to={"dietSchedule"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname === "/dietSchedule" ? "bg-red-500 " : "bg-red-600"
        }`}
      >
        Diet Schedule
      </Link>
      <Link
        to={"dailyExercise"}
        className={`text-[18px] font-lato font-[500]  p-2  text-white cursor-pointer w-full ${
          pathname === "/dailyExercise" ? "bg-red-500 " : "bg-red-600"
        }`}
      >
        Daily Exercise
      </Link>
    </div>
  );
};

export default SideBar;
