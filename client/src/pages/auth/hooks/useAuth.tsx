import { useSelector } from "react-redux";
import { TStore } from "../../../store/store";

export const useAuth = () => {
  const authReducer = useSelector((state: TStore) => state.authReducer);
  return { ...authReducer };
};
