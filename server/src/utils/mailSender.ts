import nodeMailer from "nodemailer";
export const mailSender = async (
  email: string,
  title: string,
  body: string
) => {
  console.log(email, title, body);
  try {
    let transporter = nodeMailer.createTransport({
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
  } catch (err) {
    console.log(err);
  }
};
