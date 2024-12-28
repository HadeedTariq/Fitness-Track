import { FaCircleUser } from "react-icons/fa6";
import UserDropDown from "./UserDropDown";
import { useApp } from "../hooks/useApp";
import { useDispatch } from "react-redux";
import { setDropDown } from "../reducers/appReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const { dropdown } = useApp();
  return (
    <div className="w-full fixed h-[80px] flex justify-between items-center py-2 px-4 shadow-md bg-[white] z-50">
      <img
        src={"/Fitquest.png"}
        alt={"Main Logo"}
        className={`h-20 w-h-20 object-contain `}
      />

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
