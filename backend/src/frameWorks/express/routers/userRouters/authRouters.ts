import { Router } from "express";
import userAuthInteractor from "../../../../application/useCases/user/authUseCase";
import UserAuthController from "../../../../interFace/controlers/user/userAuthController";
import OTPService from "../../../services/OTPServices";
import UserAuthRepository from "../../../../interFace/repositories/userRepositories/userAuthRepository";
import { config } from "../../../config/envConfig";
import EmailService from "../../../services/mailer";

export const authRouter = Router();
console.log(config.EMAIL_PASS, "is the cofirge");
require("dotenv").config();
const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const optGenerator = new OTPService();
const repository = new UserAuthRepository();
const interactor = new userAuthInteractor(
  repository,
  emailService,
  optGenerator
);

const userAuthController = new UserAuthController(interactor);

authRouter.post("/signup", userAuthController.signUp.bind(userAuthController));
