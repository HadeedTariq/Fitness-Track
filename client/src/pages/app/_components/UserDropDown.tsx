import { Link } from "react-router-dom";
import { authApi } from "../../../utils/axios";
import { setUser } from "../reducers/appReducer";
import { useMutation } from "@tanstack/react-query";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const { mutate: logoutUser } = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: async () => {
      const { data } = await authApi.post("/logout");
      toast({
        title: "User logged out successfully" || data.message,
      });
      dispatch(setUser(null));
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
  return (
    <DropdownMenuGroup className="p-1 gap-2 flex flex-col">
      <DropdownMenuItem>
        <Link to={"/dashboard"}>My Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div
          className="w-full flex items-center cursor-pointer gap-1 text-red-500 hover:text-red-400 font-ubuntu"
          onClick={() => logoutUser()}>
          <MdLogout size={20} />
          <p>Logout</p>
        </div>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

export default UserDropDown;
