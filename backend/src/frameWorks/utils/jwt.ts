import jwt from "jsonwebtoken";
import { config } from "../config/envConfig";

export const generatingSignUpToken = (user: object, OTP: string): string => {
  const otpExpiresAt = Math.floor(Date.now() / 1000) + 60;

  const token = jwt.sign({ user, OTP, otpExpiresAt }, config.JWT_SECRET, {
    expiresIn: "1m",
  });

  return token;
};
