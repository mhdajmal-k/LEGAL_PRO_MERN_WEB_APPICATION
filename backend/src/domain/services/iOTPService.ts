export interface iOTPService {
  generateOTP(): string;
  verify(userOTP: string, storedOTP: string): boolean;
}
