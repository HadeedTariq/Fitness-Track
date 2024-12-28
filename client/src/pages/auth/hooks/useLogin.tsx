import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidator, loginValidator } from "../validators/user.validator";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ErrResponse } from "../../../types/general";

export const useLogin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const form = useForm<LoginValidator>({
    resolver: zodResolver(loginValidator),
  });
  const mutator = useMutation({
    mutationKey: ["logInToAccount"],
    mutationFn: async (user: LoginValidator) => {
      const { data } = await authApi.post("/login", user);
      console.log(data);
    },
    onSuccess: () => {
      toast({
        title: "User logged in successfully",
        status: "success",
        isClosable: true,
      });
      form.reset();
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    },
    onError: (err: ErrResponse) => {
      console.log(err);
      toast({
        title: err.response.data.message || "Something went wrong",
        status: "error",
        isClosable: true,
      });
    },
  });

  return { form: { ...form }, mutations: { ...mutator } };
};
