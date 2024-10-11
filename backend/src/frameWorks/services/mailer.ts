import nodemailer from "nodemailer";
import { iEmailService } from "../../domain/services/IEmailService";

class EmailService implements iEmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly EMAIL_ID: string,
    private readonly EMAIL_PASS: string
  ) {
    console.log(`Initializing EmailService with ID: ${this.EMAIL_ID}`);
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
              <h2 style="color: #333; text-align: center;">Registration Form : ${status}"successFully"</h2>
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
}

export default EmailService;
