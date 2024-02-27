import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "../../../utils/axios";
import { User } from "../../../types/general";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/appReducer";

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
    <div>
      HomeBar
      <Outlet />
    </div>
  );
};

export default HomeBar;
