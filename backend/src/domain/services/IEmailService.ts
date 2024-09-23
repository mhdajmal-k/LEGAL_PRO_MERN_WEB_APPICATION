import { config } from "../../frameWorks/config/envConfig";

export interface iEmailService {
  sendOTP(email: string, otp: string, userName: string): Promise<any>;
}

export const Mailer = {
  id: process.env.EMAIL_ID,
  pass: process.env.EMAIL_PASS,
};
