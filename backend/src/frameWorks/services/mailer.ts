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
}

export default EmailService;
