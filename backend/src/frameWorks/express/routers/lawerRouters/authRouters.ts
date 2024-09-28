import { Router } from "express";
import LawyerAuthInteractor from "../../../../application/useCases/lawyer/lawyerAuthUseCase";
import OTPService from "../../../services/OTPServices";
import LawyerAuthRepository from "../../../../interFace_adapters/repositories/lawyerRepositories/lawyerAuthRepository";
import { config } from "../../../config/envConfig";
import EmailService from "../../../services/mailer";
import JwtToken from "../../../services/jwt";
import LawyerAuthController from "../../../../interFace_adapters/controlers/lawyer/lawyerAuthController";
require("dotenv").config();
export const lawyerAuthRouter = Router();
const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const optGenerator = new OTPService();
const repository = new LawyerAuthRepository();
const jwtToken = new JwtToken(config.JWT_SECRET);
const interactor = new LawyerAuthInteractor(
  repository,
  emailService,
  optGenerator,
  jwtToken
);

const lawyerAuthController = new LawyerAuthController(interactor);

lawyerAuthRouter.post(
  "/signup",
  lawyerAuthController.lawyerSignUp.bind(lawyerAuthController)
);
