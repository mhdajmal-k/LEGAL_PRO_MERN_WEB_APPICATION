import { iOTPService } from "../../domain/services/iOTPService";

class OTPService implements iOTPService {
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  verify(userOTP: string, storedOTP: string): boolean {
    throw new Error("Method not implemented.");
  }
}

export default OTPService;
