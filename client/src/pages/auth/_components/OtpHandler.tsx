import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { HStack, PinInput, PinInputField, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../utils/axios";

const OtpHandler = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const [otp, setOtp] = useState("");

  const { mutate: verifyOtp, isPending } = useMutation({
    mutationKey: ["otpVerify"],
    mutationFn: async () => {
      if (otp.length < 6) {
        toast({
          title: "Please fill all the otp fields",
          status: "warning",
          isClosable: true,
        });
        return;
      }
      const { data } = await authApi.post("/register", { ...user, otp });
      toast({
        title: "User created successfully" || data.message,
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 300);
    },
    onError: () => {
      toast({
        title: "Incorrect Otp",
        status: "error",
        isClosable: true,
      });
    },
  });
  if (!user) return <Navigate to={"/auth/register"} />;

  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <div className="bg-gray-800 p-4 px-10 rounded-md flex flex-col gap-4 text-white">
        <p>Enter your otp</p>
        <HStack>
          <PinInput onChange={(e) => setOtp(e)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <button
          onClick={() => verifyOtp()}
          disabled={isPending}
          className="bg-violet-500 rounded-md p-2  font-semibold hover:bg-purple-500 disabled:bg-purple-300">
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpHandler;
