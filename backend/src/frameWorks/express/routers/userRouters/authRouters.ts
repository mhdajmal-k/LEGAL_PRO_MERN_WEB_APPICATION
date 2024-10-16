import { Router } from "express";
import userAuthInteractor from "../../../../application/useCases/user/authUseCase";
import UserAuthController from "../../../../interFace_adapters/controlers/user/userAuthController";
import OTPService from "../../../services/OTPServices";
import UserAuthRepository from "../../../../interFace_adapters/repositories/userRepositories/userAuthRepository";
import { config } from "../../../config/envConfig";
import EmailService from "../../../services/mailer";
import JwtToken from "../../../services/jwt";

export const authRouter = Router();
require("dotenv").config();
const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const optGenerator = new OTPService();
const jwtToken = new JwtToken(config.JWT_SECRET, config.JWT_REFRESH_SECRET);
const repository = new UserAuthRepository();
const interactor = new userAuthInteractor(
  repository,
  emailService,
  optGenerator,
  jwtToken
);

const userAuthController = new UserAuthController(interactor);

authRouter.post("/signup", userAuthController.signUp.bind(userAuthController));
authRouter.post(
  "/verify-otp",
  userAuthController.verifyOtp.bind(userAuthController)
);
authRouter.post(
  "/login",
  userAuthController.loginUser.bind(userAuthController)
);
authRouter.post(
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
authRouter.post(
  "/resetforgotpassword/:token",
  userAuthController.resetforgotpassword.bind(userAuthController)
);

authRouter.post("/logout", userAuthController.logOut.bind(userAuthController));
