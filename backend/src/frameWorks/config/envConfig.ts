import dotenv from "dotenv";
dotenv.config();
export const config = {
  PORT: process.env.PORT || 3002,
  DB_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_ID: process.env.EMAIL_ID,
  S3ACCESS_KEY: process.env.ACCESS_KEY,
  S3SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME,
  BUCKET_REGION: process.env.BUCKET_REGION,
};
