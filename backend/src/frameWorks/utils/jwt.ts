import jwt from "jsonwebtoken";
import { config } from "../config/envConfig";
import { IUser } from "../../domain/entites/imodels/Iuser";

interface DecodedTokenType {
  user: IUser;
  OTP: string;
  otpExpiresAt: number;
  exp: number;
}

export const generatingSignUpToken = (user: object, OTP: string): string => {
  try {
    const otpExpiresAt = Math.floor(Date.now() / 1000) + 60;

    const token = jwt.sign({ user, OTP, otpExpiresAt }, config.JWT_SECRET, {
      expiresIn: "5m",
    });

    return token;
  } catch (error) {
    console.error("Error generating signup token:", error);
    throw new Error("Failed to generate signup token");
  }
};

export const decodeSingUpToken = (token: string): DecodedTokenType => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as DecodedTokenType;
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to decode signup token");
  }
};
