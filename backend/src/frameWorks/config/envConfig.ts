import dotenv from "dotenv";
dotenv.config();
export const config = {
  PORT: process.env.PORT || 3002,
  CONVINEANCEFEE: process.env.CONVINEANCEFEE,
  DB_URL: process.env.DATABASE_URL || "",
  DB_URLLOCAL: process.env.DATABASE_URLLOCAL || "",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "your_jwtJWT_REFRESH_SECRET",
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_ORIGIN2: process.env.CORS_ORIGIN2,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_ID: process.env.EMAIL_ID,
  S3ACCESS_KEY: process.env.ACCESS_KEY,
  S3SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME,
  BUCKET_REGION: process.env.BUCKET_REGION,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  RAZORPAY_ID: process.env.RAZORPAY_ID,
  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
  LAWYER_ForgotPassword_Link: process.env.LAWYER_ForgotPassword_Link,
  USER_ForgotPassword_Link: process.env.USER_ForgotPassword_Link,
};
