import nodemailer from "nodemailer";
import { config } from "../config/envConfig";
import { Mailer } from "../../domain/services/IEmailService";

const sendMail = async (
  email: string,
  otp: string
): Promise<{ success: boolean }> => {
  try {
    console.log(config.EMAIL_ID, "is the config ");
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ajmalchundappuram@gmail.com",
        pass: "uuvydjgoppjqscvz",
      },
    });
    console.log(config.EMAIL_ID);
    const mailOptions = {
      from: Mailer.id,
      to: email,
      subject: "Your OTP for registration",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    };
    try {
      const response = await transporter.sendMail(mailOptions);
      console.log("Email sent:", response.response);
      return { success: true };
    } catch (error) {
      console.log(error);
      console.log("error sending email");
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
export default sendMail;
