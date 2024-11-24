import mongoose from "mongoose";
import { config } from "../config/envConfig";
export const connectToDatabase = async () => {
  try {
    // await mongoose.connect(config.DB_URLLOCAL);
    await mongoose.connect(config.DB_URL);
    console.log("DB CONNECTED");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Connection failed due to: ${error.message}`);
    } else {
      console.log("An unknown error occurred");
    }
  }
};
