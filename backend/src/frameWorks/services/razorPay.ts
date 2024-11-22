import Razorpay from "razorpay";

console.log("Razorpay IDsssssssssssssssssss:", process.env.RAZORPAY_ID);
console.log("Razorpay Secretsssssssssssssss:", process.env.RAZORPAY_SECRET);
if (!process.env.RAZORPAY_ID || !process.env.RAZORPAY_SECRET) {
  throw new Error("Razorpay environment variables are not set!");
}
export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});
