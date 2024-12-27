import { Link } from "react-router-dom";
import { authApi } from "../../../utils/axios";

import { useMutation } from "@tanstack/react-query";

import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { setUser } from "@/pages/auth/reducers/authReducer";

const UserDropDown = () => {
  const dispatch = useDispatch();

  const { mutate: logoutUser, isPending } = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: async () => {
      const { data } = await authApi.post("/logout");
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "User logged out successfully",
        duration: 1000,
      });
      dispatch(setUser(null));
      setTimeout(() => {
        window.location.reload();
      }, 700);
    },
  });
  return (
    <>
      <div className="absolute top-7 transition-opacity duration-700 ease-in-out right-0">
        <div
          className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <Link
              to={"/dashboard"}
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              My Profile
            </Link>

            <Button
              disabled={isPending}
              variant={"destructive"}
              onClick={() => logoutUser()}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDropDown;
