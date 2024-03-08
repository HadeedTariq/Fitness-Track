"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const mailSender_1 = require("../../utils/mailSender");
const otpSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const sendMail = async (email, otp) => {
    const mailResponse = await (0, mailSender_1.mailSender)(email, "Verification Email", `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`);
    console.log("Email sent successfully: ", mailResponse);
};
otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        await sendMail(this.email, this.otp);
    }
    next();
});
exports.Otp = (0, mongoose_1.model)("Otp", otpSchema);
//# sourceMappingURL=otp.model.js.map