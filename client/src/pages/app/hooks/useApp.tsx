import { useSelector } from "react-redux";
import { TStore } from "../../../store/store";

export const useApp = () => {
  const appReducer = useSelector((state: TStore) => state.appReducer);
  return { ...appReducer };
};
