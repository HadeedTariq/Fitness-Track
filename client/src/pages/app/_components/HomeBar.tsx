import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "../../../utils/axios";
import { User } from "../../../types/general";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/appReducer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SideBarDrawer from "./SideBarDrawer";

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
      <div className="relative h-[80px]">
        <NavBar />
      </div>
      <div className="flex  w-full">
        <div className="relative w-[220px] h-[94.1vh] max-[700px]:hidden mr-0">
          <SideBar />
        </div>
        <div className="min-[700px]:hidden">
          <SideBarDrawer />
        </div>
        <div className="w-full ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeBar;
