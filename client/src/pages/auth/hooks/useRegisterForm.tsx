import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterValidator,
  registerValidator,
} from "../validators/user.validator";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/authReducer";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<RegisterValidator>({
    resolver: zodResolver(registerValidator),
  });
  const mutator = useMutation({
    mutationKey: ["createAccount"],
    mutationFn: async (user: RegisterValidator) => {
      const { data } = await authApi.post("/sendOtp", user);
      console.log(data);
      dispatch(setUser(user));
    },
    onSuccess: () => {
      toast({
        title: "Please check your email to get otp",
        status: "success",
        isClosable: true,
      });
      form.reset();
      setTimeout(() => {
        navigate("/auth/otpChecker");
      }, 1200);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { form: { ...form }, mutations: { ...mutator } };
};
