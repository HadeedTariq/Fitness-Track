import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidator, postValidator } from "../validators/postValidator";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postApi } from "../../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { register, formState, reset, handleSubmit } = useForm<PostValidator>({
    resolver: zodResolver(postValidator),
  });

  const { mutate: createPost, isPending } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (post: PostValidator) => {
      const { data } = await postApi.post("/create", post);
      toast({
        title: "Post created successfully" || data.message,
        isClosable: true,
        status: "success",
      });
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["myProfile", 0] as InvalidateQueryFilters);
      navigate("/dashboard");
    },
  });

  const onSubmit = (post: PostValidator) => {
    createPost(post);
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="max-w-md  w-full p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {formState.errors.title && (
              <p className="text-red-600 font-roboto-mono text-[14px]">
                {formState.errors.title.message}
              </p>
            )}
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            {formState.errors.description && (
              <p className="text-red-600 font-roboto-mono text-[14px]">
                {formState.errors.description.message}
              </p>
            )}
            <label
              htmlFor="content"
              className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              className="border border-gray-300 rounded-lg px-3 py-2 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
              {...register("description")}
              required></textarea>
          </div>
          <button
            type="submit"
            disabled={isPending || formState.disabled}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
