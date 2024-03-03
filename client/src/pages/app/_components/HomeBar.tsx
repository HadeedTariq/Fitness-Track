import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "../../../utils/axios";
import { User } from "../../../types/general";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/appReducer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const HomeBar = () => {
  const dispatch = useDispatch();
  const { data: user } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const { data } = await authApi.get("/");
      dispatch(setUser(data.userInfo));
      return data.userInfo as User;
    },
  });

  if (!user?.email) {
    return <Navigate to={"/auth/register"} />;
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[50px]">
        <NavBar />
      </div>
      <div className="flex gap-2">
        <div className="relative w-[210px] h-[94.1vh] ">
          <SideBar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeBar;
