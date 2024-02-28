import { FaCircleUser } from "react-icons/fa6";
import UserDropDown from "./UserDropDown";
import { useApp } from "../hooks/useApp";
import { useDispatch } from "react-redux";
import { setDropDown } from "../reducers/appReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const { dropdown } = useApp();
  return (
    <div className="w-full fixed h-[50px] flex justify-between items-center py-2 px-4 shadow-md bg-gray-300/90 z-50">
      <h2 className="font-kode-mono text-[23px] font-semibold">
        Fitness-Track
      </h2>
      <div className="flex flex-col relative">
        <FaCircleUser
          size={35}
          cursor={"pointer"}
          onClick={() => dispatch(setDropDown())}
        />

        {dropdown && <UserDropDown />}
      </div>
    </div>
  );
};

export default NavBar;
