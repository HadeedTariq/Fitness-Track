import { useMutation } from "@tanstack/react-query";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { setUser } from "../reducers/appReducer";

const UserDropDown = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: logoutUser, isPending } = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: async () => {
      const { data } = await authApi.post("/logout");
      toast({
        title: "User logged out successfully" || data.message,
        status: "success",
        isClosable: true,
      });
      dispatch(setUser(null));
      navigate("/auth/login");
    },
  });
  return (
    <>
      <div className="absolute top-7 transition-opacity duration-700 ease-in-out right-0">
        <div
          className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu">
          <div className="p-2">
            <Link
              to={"/profile"}
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem">
              My Profile
            </Link>

            <button
              disabled={isPending}
              className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center cursor-pointer  gap-2 w-full"
              role="menuitem"
              onClick={() => logoutUser()}>
              <MdLogout size={20} />
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDropDown;
