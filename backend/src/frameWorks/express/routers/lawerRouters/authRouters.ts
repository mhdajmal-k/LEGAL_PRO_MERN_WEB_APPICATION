import { Router } from "express";
import LawyerAuthInteractor from "../../../../application/useCases/lawyer/lawyerAuthUseCase";
import OTPService from "../../../services/OTPServices";
import LawyerAuthRepository from "../../../../interFace_adapters/repositories/lawyerRepositories/lawyerAuthRepository";
import { config } from "../../../config/envConfig";
import EmailService from "../../../services/mailer";
import JwtToken from "../../../services/jwt";
import LawyerAuthController from "../../../../interFace_adapters/controlers/lawyer/lawyerAuthController";
import multer from "multer";
import { S3Service } from "../../../config/s3Setup";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
require("dotenv").config();
export const lawyerAuthRouter = Router();
const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const optGenerator = new OTPService();
const IS3Services = new S3Service();
const repository = new LawyerAuthRepository();

const jwtToken = new JwtToken(config.JWT_SECRET);
const interactor = new LawyerAuthInteractor(
  repository,
  emailService,
  optGenerator,
  jwtToken,
  IS3Services
);

const lawyerAuthController = new LawyerAuthController(interactor);

lawyerAuthRouter.post(
  "/signup",
  upload.single("image"),
  lawyerAuthController.lawyerSignUp.bind(lawyerAuthController)
);
lawyerAuthRouter.post(
  "/verify-otp",
  lawyerAuthController.lawyerVerifyOtp.bind(lawyerAuthController)
);
