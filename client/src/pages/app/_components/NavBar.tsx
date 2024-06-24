import { FaCircleUser } from "react-icons/fa6";
import UserDropDown from "./UserDropDown";
import { useNavigate } from "react-router-dom";
import { ThemeHandler } from "@/components/ThemeHandler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full fixed h-[50px] flex justify-between items-center py-2 px-4 shadow-md bg-gray-300/90 z-50 dark:bg-gray-800">
      <h2
        className="font-kode-mono text-[23px] font-semibold cursor-pointer"
        onClick={() => navigate("/")}>
        Fitness-Track
      </h2>
      <div className="flex items-center gap-3">
        <ThemeHandler />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaCircleUser size={35} cursor={"pointer"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="gap-2">
            <DropdownMenuSeparator />
            <UserDropDown />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
