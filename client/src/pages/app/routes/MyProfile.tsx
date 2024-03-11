import { useQuery } from "@tanstack/react-query";
import Profile from "../_components/Profile";
import { authApi } from "../../../utils/axios";
import { UserProfile } from "../types/appTypes";
import { useDispatch } from "react-redux";
import { setMyOverAllProgress, setMyPosts } from "../reducers/appReducer";

const MyProfile = () => {
  const dispatch = useDispatch();
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const { data } = await authApi.get("/profile");
      dispatch(setMyPosts(data.myPosts));
      dispatch(setMyOverAllProgress(data.overAllProgress));
      return data as UserProfile;
    },
  });
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong</h1>;

  return (
    <div className="flex flex-col gap-2 w-full">
      {profile && <Profile profile={profile} />}
    </div>
  );
};

export default MyProfile;
