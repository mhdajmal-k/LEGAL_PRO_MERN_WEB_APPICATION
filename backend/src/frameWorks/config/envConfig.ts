import dotenv from "dotenv";
dotenv.config();
export const config = {
  PORT: process.env.PORT || 3002,
  DB_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_ID: process.env.EMAIL_ID,
};
