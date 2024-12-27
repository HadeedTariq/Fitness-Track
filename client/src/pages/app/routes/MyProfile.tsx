import { useQuery } from "@tanstack/react-query";
import Profile from "../_components/Profile";
import { authApi } from "../../../utils/axios";
import { UserProfile } from "../types/appTypes";

const MyProfile = () => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const { data } = await authApi.get("/profile");

      return data as UserProfile;
    },
  });
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong</h1>;

  return (
    <div className="flex flex-col gap-2 w-full  px-2 overflow-x-hidden">
      {profile && <Profile profile={profile} />}
    </div>
  );
};

export default MyProfile;
