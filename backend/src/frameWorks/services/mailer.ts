import nodemailer from "nodemailer";
import { iEmailService } from "../../domain/services/IEmailService";

class EmailService implements iEmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly EMAIL_ID: string,
    private readonly EMAIL_PASS: string
  ) {
    // console.log(`Initializing EmailService with ID: ${this.EMAIL_ID}`);
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.EMAIL_ID,
        pass: this.EMAIL_PASS,
      },
    });
  }

  async sendOTP(
    email: string,
    otp: string,
    userName: string
  ): Promise<boolean> {
    console.log(`Attempting to send OTP to: ${email}`);
    try {
      const info = await this.transporter.sendMail({
        from: this.EMAIL_ID,
        to: email,
        subject: "Your OTP for Registration with Legal_Pro",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; text-align: center;">Welcome to Legal_Pro</h2>
              <p style="font-size: 16px; color: #555;">
                Dear ${userName},
              </p>
              <p style="font-size: 16px; color: #555;">
                Thank you for choosing Legal_Pro for your legal services. To proceed with your account setup, please use the OTP provided below:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; color: #0044cc; padding: 10px 20px; background-color: #f0f8ff; border-radius: 5px; display: inline-block;">
                  ${otp}
                </span>
              </div>
              <p style="font-size: 16px; color: #555;">
                This OTP is valid for the next 1 minutes. If you did not request this OTP, please disregard this email.
              </p>
              <p style="font-size: 16px; color: #555;">
                Best regards,<br>
                The Legal_Pro Team
              </p>
            </div>
            <footer style="text-align: center; padding: 10px 0; color: #888; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} Legal_Pro | Legal Services</p>
              <p>
                Legal_Pro, 123 Legal St, kochi,kerala
                <br>
                <a href="https://Legal_Pro.com" style="color: #0044cc; text-decoration: none;">Visit our website</a>
              </p>
            </footer>
          </div>
        `,
      });
      console.log(
        `OTP sent successfully to ${email}. Message ID: ${info.messageId}`
      );
      return true;
    } catch (error: any) {
      console.error(`Failed to send OTP to ${email}:`, error);
      return false;
    }
  }
  async sendStatusNotification(
    email: string,
    reason: string,
    userName: string,
    status: "Verified" | "Unverified" | string
  ): Promise<boolean> {
    console.log(`Attempting to send ${status} status email to: ${email}`);
    try {
      const info = await this.transporter.sendMail({
        from: this.EMAIL_ID,
        to: email,
        subject: `Registration Form  verification with Legal_Pro: ${status}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; text-align: center;">Registration Form : ${status} successFully</h2>

              <p style="font-size: 16px; color: #555;">
                Dear ${userName},
              </p>
              <p style="font-size: 16px; color: #555;">
                We would like to inform you that your  Registration Form status has been : <strong>${status}</strong>.
              </p>
              <p style="font-size: 16px; color: #555;">
               ${reason}
                We would like to inform you that your  Registration Form status has been verify to: <strong>${status}</strong>.
              </p>
              <p style="font-size: 16px; color: #555;">
                Reason: ${reason}
              </p>
              <p style="font-size: 16px; color: #555;">
                If you have any questions or concerns, feel free to reach out to our support team.
              </p>
              <p style="font-size: 16px; color: #555;">
                Best regards,<br>
                The Legal_Pro Team
              </p>
            </div>
            <footer style="text-align: center; padding: 10px 0; color: #888; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} Legal_Pro | Legal Services</p>
              <p>
                Legal_Pro, 123 Legal St, Kochi, Kerala
                <br>
                <a href="https://Legal_Pro.com" style="color: #0044cc; text-decoration: none;">Visit our website</a>
              </p>
            </footer>
          </div>
        `,
      });
      console.log(
        `Status notification sent successfully to ${email}. Message ID: ${info.messageId}`
      );
      return true;
    } catch (error: any) {
      console.error(`Failed to send status notification to ${email}:`, error);
      return false;
    }
  }
  async sendResetLink(
    email: string,
    resetLink: string,
    userName: string
  ): Promise<boolean> {
    console.log(`Attempting to send reset link to: ${email}`);
    try {
      const info = await this.transporter.sendMail({
        from: this.EMAIL_ID,
        to: email,
        subject: "Password Reset Request for Legal_Pro",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
              <p style="font-size: 16px; color: #555;">
                Dear ${userName},
              </p>
              <p style="font-size: 16px; color: #555;">
                  reset your password. Please click the link below to reset it:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="font-size: 18px; font-weight: bold; color: #ffffff; background-color: #0044cc; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
                  Reset Password
                </a>
                
              </div>
              <p style="font-size: 16px; color: #555;">
                This link is valid for the next 15 minutes. If you did not request a password reset, please disregard this email.
              </p>
              <p style="font-size: 16px; color: #555;">
                Best regards,<br>
                The Legal_Pro Team
              </p>
            </div>
            <footer style="text-align: center; padding: 10px 0; color: #888; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} Legal_Pro | Legal Services</p>
              <p>
                Legal_Pro, 123 Legal St, Kochi, Kerala
                <br>
                <a href="https://Legal_Pro.com" style="color: #0044cc; text-decoration: none;">Visit our website</a>
              </p>
            </footer>
          </div>
        `,
      });
      console.log(
        `Reset link sent successfully to ${email}. Message ID: ${info.messageId}`
      );
      return true;
    } catch (error: any) {
      console.error(`Failed to send reset link to ${email}:`, error);
      return false;
    }
  }
  async sendBookingConfirmation(
    email: string,
    userName: string,
    appointmentDetails: any
  ): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: this.EMAIL_ID,
        to: email,
        subject: "Appointment Confirmation with Legal_Pro",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <div style="text-align: center;">
                <img src="https://img.icons8.com/color/48/000000/checked.png" alt="Confirmed Icon" style="width: 50px; margin-bottom: 10px;" />
                <h2 style="color: #333; margin: 0;">Appointment Confirmation</h2>
                <p style="color: #555; font-size: 16px; margin-top: 10px;">with Legal_Pro</p>
              </div>
              <hr style="margin: 20px 0; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 16px; color: #555;">
                Dear <strong>${userName}</strong>,
              </p>
              <p style="font-size: 16px; color: #555;">
                We’re pleased to confirm your appointment has been successfully booked. Below are the details:
              </p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="font-size: 16px; color: #555; margin: 5px 0;">
                  <img src="https://img.icons8.com/color/48/000000/calendar.png" alt="Calendar Icon" style="width: 18px; vertical-align: middle; margin-right: 5px;" />
                  <strong>Date and Time:</strong> ${
                    appointmentDetails.date
                  } at ${appointmentDetails.time}
                </p>
                <p style="font-size: 16px; color: #555; margin: 5px 0;">
                  <img src="https://img.icons8.com/color/48/000000/lawyer.png" alt="Lawyer Icon" style="width: 18px; vertical-align: middle; margin-right: 5px;" />
                  <strong>${appointmentDetails.lawyerName}</strong> 
                </p>
              </div>
              <p style="font-size: 16px; color: #555; text-align: center;">
                Thank you for choosing <strong>Legal_Pro</strong>! We look forward to assisting you.
              </p>
              <hr style="margin: 20px 0; border-top: 1px solid #e0e0e0;">
              <footer style="text-align: center; color: #888; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} Legal_Pro | Legal Services</p>
                <p>Legal_Pro, 123 Legal St, Kochi, Kerala<br>
                  <a href="https://Legal_Pro.com" style="color: #0044cc; text-decoration: none;">Visit our website</a>
                </p>
              </footer>
            </div>
          </div>
        `,
      });
      console.log(
        `Booking confirmation sent to ${email}. Message ID: ${info.messageId}`
      );
      return true;
    } catch (error) {
      console.error(`Failed to send booking confirmation to ${email}:`, error);
      return false;
    }
  }

  async sendCancellationNotification(
    email: string,
    userName: string,
    appointmentDetails: any
  ): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: this.EMAIL_ID,
        to: email,
        subject: "Appointment Cancellation Notification",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <div style="text-align: center;">
                <img src="https://img.icons8.com/color/48/000000/cancel.png" alt="Cancelled Icon" style="width: 50px; margin-bottom: 10px;" />
                <h2 style="color: #d9534f; margin: 0;">Appointment Cancellation Notice</h2>
                <p style="color: #555; font-size: 16px; margin-top: 10px;">Due to unforeseen commitments</p>
              </div>
              <hr style="margin: 20px 0; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 16px; color: #555;">
                Dear <strong>${userName}</strong>,
              </p>
              <p style="font-size: 16px; color: #555;">
                We regret to inform you that your scheduled appointment has been canceled due to unforeseen commitments from <strong>${
                  appointmentDetails.lawyerName
                }</strong>. We apologize for any inconvenience caused and appreciate your understanding.
              </p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="font-size: 16px; color: #555; margin: 5px 0;">
                 
                  <strong>Date and Time:</strong> ${
                    appointmentDetails.date
                  } at ${appointmentDetails.time}
                </p>
                <p style="font-size: 16px; color: #555; margin: 5px 0;">
               
                  <strong>Lawyer:</strong> ${appointmentDetails.lawyerName}
                </p>
              </div>
              <p style="font-size: 16px; color: #555;">
                A refund has been initiated and should reflect in your account within the next few business days. For rescheduling assistance, please reach out to our support team.
              </p>
              <hr style="margin: 20px 0; border-top: 1px solid #e0e0e0;">
              <footer style="text-align: center; color: #888; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} Legal_Pro | Legal Services</p>
                <p>Legal_Pro, 123 Legal St, Kochi, Kerala<br>
                  <a href="https://Legal_Pro.com" style="color: #0044cc; text-decoration: none;">Visit our website</a>
                </p>
              </footer>
            </div>
          </div>
        `,
      });
      console.log(
        `Cancellation notification sent to ${email}. Message ID: ${info.messageId}`
      );
      return true;
    } catch (error) {
      console.error(
        `Failed to send cancellation notification to ${email}:`,
        error
      );
      return false;
    }
  }
  async sendCancellationConfirmationToLawyer(
    lawyerEmail: string,
    lawyerName: string,
    appointmentDetails: any
  ): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: this.EMAIL_ID,
        to: lawyerEmail,
        subject:
          "Appointment Cancellation Confirmation & Availability Reminder",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <div style="text-align: center;">
                <img src="https://img.icons8.com/color/48/000000/confirmation.png" alt="Confirmation Icon" style="width: 50px; margin-bottom: 10px;" />
                <h2 style="color: #5bc0de; margin: 0;">Appointment Cancellation Confirmation</h2>
                <p style="color: #555; font-size: 16px; margin-top: 10px;">with Legal_Pro</p>
              </div>
              <hr style="margin: 20px 0; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 16px; color: #555;">
                Dear <strong>${lawyerName}</strong>,
              </p>
              <p style="font-size: 16px; color: #555;">
                This is to confirm that the scheduled appointment with the following client has been canceled:
              </p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="font-size: 16px; color: #555; margin: 5px 0;">
                  <strong>Client Name:</strong> ${appointmentDetails.userName}
                </p>
                <p style="font-size: 16px; color: #555; margin: 5px 0;">
                  <strong>Date and Time:</strong> ${
                    appointmentDetails.date
                  } at ${appointmentDetails.time}
                </p>
              </div>
              <p style="font-size: 16px; color: #555;">
                The client has been notified of the cancellation, offered the option to reschedule, and a refund has been processed.
              </p>
              <h3 style="color: #5bc0de;">Availability Reminder</h3>
              <p style="font-size: 16px; color: #555;">
                Please double-check your availability before creating new slots to ensure a smooth experience for our clients. Consistency and punctuality are highly valued, and repeated cancellations should be avoided.
              </p>
              <hr style="margin: 20px 0; border-top: 1px solid #e0e0e0;">
              <footer style="text-align: center; color: #888; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} Legal_Pro | Legal Services</p>
                <p>Legal_Pro, 123 Legal St, Kochi, Kerala<br>
                  <a href="https://Legal_Pro.com" style="color: #0044cc; text-decoration: none;">Visit our website</a>
                </p>
              </footer>
            </div>
          </div>
        `,
      });
      console.log(
        `Cancellation confirmation sent to ${lawyerEmail}. Message ID: ${info.messageId}`
      );
      return true;
    } catch (error) {
      console.error(
        `Failed to send cancellation confirmation to ${lawyerEmail}:`,
        error
      );
      return false;
    }
  }
}

export default EmailService;
