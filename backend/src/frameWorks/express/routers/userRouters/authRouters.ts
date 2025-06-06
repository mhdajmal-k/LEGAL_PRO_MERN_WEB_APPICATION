import { Router } from "express";
import userAuthInteractor from "../../../../application/useCases/user/authUseCase";
import UserAuthController from "../../../../interFace_adapters/controlers/user/userAuthController";
import OTPService from "../../../services/OTPServices";
import UserAuthRepository from "../../../../interFace_adapters/repositories/userRepositories/userAuthRepository";
import { config } from "../../../config/envConfig";
import EmailService from "../../../services/mailer";
import JwtToken from "../../../services/jwt";
import { apiLimiter } from "../../../config/rateLimit";
import { S3Service } from "../../../config/s3Setup";

export const authRouter = Router();
const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const IS3Services = new S3Service();
const optGenerator = new OTPService();
const jwtToken = new JwtToken(config.JWT_SECRET, config.JWT_REFRESH_SECRET);
const repository = new UserAuthRepository();
const interactor = new userAuthInteractor(
  repository,
  emailService,
  optGenerator,
  jwtToken,
  IS3Services
);

const userAuthController = new UserAuthController(interactor);

authRouter.post(
  "/signup",
  apiLimiter,
  userAuthController.signUp.bind(userAuthController)
);
authRouter.post(
  "/verify-otp",
  userAuthController.verifyOtp.bind(userAuthController)
);
authRouter.post(
  "/login",
  apiLimiter,
  userAuthController.loginUser.bind(userAuthController)
);
authRouter.get(
  "/resend-otp",
  userAuthController.resendOtp.bind(userAuthController)
);

authRouter.post(
  "/googlesignup",
  userAuthController.googleSignUp.bind(userAuthController)
);
authRouter.post(
  "/forgotpassword",
  userAuthController.forgotpassword.bind(userAuthController)
);
authRouter.patch(
  "/resetforgotpassword/:token",
  userAuthController.resetforgotpassword.bind(userAuthController)
);
authRouter.post(
  "/refreshToken",
  userAuthController.checkRefreshToken.bind(userAuthController)
);

authRouter.delete(
  "/logout",
  userAuthController.logOut.bind(userAuthController)
);
