"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailSender = async (email, title, body) => {
    console.log(email, title, body);
    try {
        let transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODE_MAILER_USER,
                pass: process.env.NODE_MAILER_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from: "hadeedtariq12@gmail.com",
            to: email,
            subject: title,
            html: body,
        });
        return info;
    }
    catch (err) {
        console.log(err);
    }
};
exports.mailSender = mailSender;
//# sourceMappingURL=mailSender.js.map