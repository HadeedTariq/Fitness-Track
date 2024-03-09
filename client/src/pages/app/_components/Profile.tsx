import { Link, useNavigate } from "react-router-dom";
import { UserProfile } from "../types/appTypes";
import Post from "./Post";

type ProfileProps = {
  profile: UserProfile;
};

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="flex flex-col">
      <p className="capitalize">username: {profile.username}</p>
      <p className="capitalize">age: {profile.age}</p>
      <p className="capitalize">gender: {profile.gender}</p>
      <p className="capitalize">height: {profile.height}</p>
      <p className="capitalize">weight: {profile.weight}</p>
      <p className="capitalize">bmi: {profile.bmi}</p>
      <Link to={"createPost"}>Create Post</Link>
      <div>
        {profile.myPosts?.map((post) => {
          <Post key={post._id} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
