import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../utils/axios";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your otp must be 6 characters long",
  }),
});

function OtpHandler() {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const { mutate: verifyOtp, isPending } = useMutation({
    mutationKey: ["otpVerify"],
    mutationFn: async (otp: string) => {
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
        variant: "destructive",
      });
    },
  });
  const navigate = useNavigate();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyOtp(data.pin);
  }

  if (!user) return <Navigate to={"/auth/register"} />;

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-purple-500 rounded-md p-7 text-white">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your otp</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <p>Please enter the otp sent to your phone</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OtpHandler;
