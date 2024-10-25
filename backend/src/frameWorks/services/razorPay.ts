import Razorpay from "razorpay";

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});
