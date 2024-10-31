import { Express, Router } from "express";
import AdminController from "../../../../interFace_adapters/controlers/admin/adminController";
import adminInteractor from "../../../../application/useCases/admin/adminUseCase";
import JwtToken from "../../../services/jwt";
import { config } from "../../../config/envConfig";
import AdminRepository from "../../../../interFace_adapters/repositories/adminRepositories/adminRepositories";
import { S3Service } from "../../../config/s3Setup";
import EmailService from "../../../services/mailer";
import { authorization } from "../../../middleware/authMilddlewere";

export const adminRouter = Router();

const jwtToken = new JwtToken(config.JWT_SECRET, config.JWT_REFRESH_SECRET);

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
adminRouter.get(
  "/users",
  authorization("admin"),
  adminController.getUsers.bind(adminController)
);
adminRouter.get(
  "/pendinglawyers",
  authorization("admin"),
  adminController.getPendingApprovalLawyer.bind(adminController)
);
adminRouter.get(
  "/lawyers",
  authorization("admin"),
  adminController.getLawyers.bind(adminController)
);
adminRouter.get(
  "/lawyer/:id",
  authorization("admin"),
  adminController.lawyer.bind(adminController)
);
adminRouter.get(
  "/appointments",
  // authorization("admin"),
  adminController.getAllAppointments.bind(adminController)
);
adminRouter.get(
  "/viewAppointment/:appointmentId",
  // authorization("admin"),
  adminController.getAppointmentData.bind(adminController)
);
adminRouter.patch(
  "/verifylawyer/:id",
  authorization("admin"),
  adminController.updateLawyer.bind(adminController)
);
adminRouter.patch(
  "/unverifylawyer/:id",
  authorization("admin"),
  adminController.unVerifyLawyer.bind(adminController)
);
adminRouter.patch(
  "/blockandunblock/:id",
  authorization("admin"),
  adminController.blockOrUnblock.bind(adminController)
);
adminRouter.delete(
  "/logout",
  adminController.adminLogOut.bind(adminController)
);
