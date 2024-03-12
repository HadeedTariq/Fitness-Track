import { Link } from "react-router-dom";
import { UserProfile } from "../types/appTypes";
import Post from "./Post";

type ProfileProps = {
  profile: UserProfile;
};

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="flex flex-col w-full">
      <p className="capitalize text-[22px] font-bold font-ubuntu">
        Welcome {profile.username} to your profile dashboard
      </p>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="capitalize text-[20px] font-bold font-roboto-mono">
          Your personal Info
        </h3>
        <div className="gap-2">
          <p className="capitalize">
            <span className="font-semibold font-lato text-[18px] text-pink-500">
              age
            </span>
            : <span className="">{profile.age}</span>
          </p>
          <p className="capitalize">
            <span className="font-semibold font-lato text-[18px] text-pink-500">
              gender
            </span>
            : <span className="">{profile.gender}</span>
          </p>
          <p className="capitalize">
            <span className="font-semibold font-lato text-[18px] text-pink-500">
              height
            </span>
            : <span className="">{profile.height}</span>
          </p>
          <p className="capitalize">
            <span className="font-semibold font-lato text-[18px] text-pink-500">
              weight
            </span>
            : <span className="">{profile.weight}</span>
          </p>
          <p className="capitalize">
            <span className="font-semibold font-lato text-[18px] text-pink-500">
              bmi
            </span>
            : <span className="">{profile.bmi}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <Link
          to={"createPost"}
          className="bg-purple-500 my-2 py-2 px-6 rounded-md font-pt-serif text-white text-[18px] w-fit">
          Create Post
        </Link>
        {/* //! Todo */}
        {/* <Link
          to={"weeklyProgress"}
          className="bg-purple-500 my-2 py-2 px-6 rounded-md font-pt-serif text-white text-[18px] w-fit">
          Weekly Progress
        </Link>
        <Link
          to={"monthlyProgress"}
          className="bg-purple-500 my-2 py-2 px-6 rounded-md font-pt-serif text-white text-[18px] w-fit">
          Monthly Progress
        </Link> */}
        <Link
          to={"totalProgress"}
          className="bg-purple-500 my-2 py-2 px-6 rounded-md font-pt-serif text-white text-[18px] w-fit">
          Total Progress
        </Link>
      </div>
      <div className="flex items-center flex-wrap w-full justify-center gap-y-2 gap-x-4 p-2">
        {profile?.myPosts?.slice(0, 6).map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <Link
        to={"allMyPosts"}
        className="bg-purple-500 mx-auto my-2 py-2 px-6 rounded-md font-pt-serif text-white text-[18px] w-fit">
        See all
      </Link>
    </div>
  );
};

export default Profile;
