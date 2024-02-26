import { Schema, model } from "mongoose";
import { mailSender } from "../../utils/mailSender";

const otpSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 5,
    },
  },
  { timestamps: true }
);

const sendMail = async (email: string, otp: string) => {
  const mailResponse = await mailSender(
    email,
    "Verification Email",
    `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`
  );
  console.log("Email sent successfully: ", mailResponse);
};

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendMail(this.email, this.otp);
  }
  next();
});

export const Otp = model("Otp", otpSchema);
