import { config } from "../../frameWorks/config/envConfig";

export interface iEmailService {
  sendOTP(email: string, otp: string, userName: string): Promise<any>;
  sendResetLink(email: string, url: string, userName: string): Promise<any>;
  sendBookingConfirmation(
    email: string,
    userName: string,
    appointmentDetails: any
  ): Promise<any>;
  sendCancellationNotification(
    email: string,
    userName: string,
    appointmentDetails: any
  ): Promise<any>;
  sendCancellationConfirmationToLawyer(
    email: string,
    userName: string,
    appointmentDetails: any
  ): Promise<any>;
  sendResetLink(
    email: string,
    userName: string,
    appointmentDetails: any
  ): Promise<any>;
}

export const Mailer = {
  id: process.env.EMAIL_ID,
  pass: process.env.EMAIL_PASS,
};
