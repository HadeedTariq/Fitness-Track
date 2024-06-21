import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidator, loginValidator } from "../validators/user.validator";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { ErrResponse } from "../../../types/general";
import { toast } from "@/components/ui/use-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const form = useForm<LoginValidator>({
    resolver: zodResolver(loginValidator),
  });
  const mutator = useMutation({
    mutationKey: ["logInToAccount"],
    mutationFn: async (user: LoginValidator) => {
      const { data } = await authApi.post("/login", user);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "User logged in successfully",
      });
      form.reset();
      setTimeout(() => {
        navigate("/");
      }, 1200);
    },
    onError: (err: ErrResponse) => {
      toast({
        title: err.response.data.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return { form: { ...form }, mutations: { ...mutator } };
};
