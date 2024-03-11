import { UserProfile } from "../types/appTypes";

type PostProps = {
  post: UserProfile["myPosts"][0];
};

const Post = ({ post }: PostProps) => {
  return (
    <div className="border-2 rounded-md border-purple-400 gap-2 p-2 w-[300px]">
      <h2 className="text-[20px] font-semibold font-ubuntu">
        {post.title.slice(0, 40)}...
      </h2>
      <p className="text-[17px]  font-roboto-mono">
        {post.description.slice(0, 200)}...
      </p>
    </div>
  );
};

export default Post;
