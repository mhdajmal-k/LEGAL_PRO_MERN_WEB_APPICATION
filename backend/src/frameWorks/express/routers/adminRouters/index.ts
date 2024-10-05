import { Express, Router } from "express";
import AdminController from "../../../../interFace_adapters/controlers/admin/adminController";
import adminInteractor from "../../../../application/useCases/admin/adminUseCase";
import JwtToken from "../../../services/jwt";
import { config } from "../../../config/envConfig";
import AdminRepository from "../../../../interFace_adapters/repositories/adminRepositories/adminRepositories";
import { S3Service } from "../../../config/s3Setup";
import EmailService from "../../../services/mailer";

export const adminRouter = Router();
const jwtToken = new JwtToken(config.JWT_SECRET);
const repository = new AdminRepository();
const IS3Services = new S3Service();
const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const interactor = new adminInteractor(
  repository,
  jwtToken,
  IS3Services,
  emailService
);

const adminController = new AdminController(interactor);

adminRouter.post("/login", adminController.adminLogin.bind(adminController));
adminRouter.get("/users", adminController.getUsers.bind(adminController));
adminRouter.get("/lawyers", adminController.getLawyer.bind(adminController));
adminRouter.get("/lawyer/:id", adminController.lawyer.bind(adminController));
adminRouter.put(
  "/verifylawyer/:id",
  adminController.updateLawyer.bind(adminController)
);
adminRouter.put(
  "/unverifylawyer/:id",
  adminController.unVerifyLawyer.bind(adminController)
);
