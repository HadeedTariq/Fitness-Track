import { useApp } from "../hooks/useApp";

const AllMyPosts = () => {
  const { myPosts } = useApp();
  return (
    <div className="flex flex-col  w-full justify-center gap-y-2 gap-x-4 p-2">
      {myPosts?.map((post) => (
        <div
          className="border-2 w-full rounded-md border-purple-400 gap-2 p-2 "
          key={post._id}>
          <h2 className="text-[20px] font-semibold font-ubuntu">
            {post.title}
          </h2>
          <p className="text-[17px]  font-roboto-mono">{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllMyPosts;
