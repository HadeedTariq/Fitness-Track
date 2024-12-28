import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "../../../utils/axios";
import { setUser } from "../reducers/authReducer";
import { User } from "../../../types/general";

const AuthProtector = () => {
  const dispatch = useDispatch();
  const { data: user } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const { data } = await authApi.get("/");
      dispatch(setUser(data.userInfo));
      return data.userInfo as User;
    },
  });

  if (user) return <Navigate to={"/dashboard"} />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthProtector;
