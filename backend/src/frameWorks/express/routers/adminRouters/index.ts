import { Express, Router } from "express";
import AdminController from "../../../../interFace_adapters/controlers/admin/adminController";
import adminInteractor from "../../../../application/useCases/admin/adminUseCase";
import JwtToken from "../../../services/jwt";
import { config } from "../../../config/envConfig";
import AdminRepository from "../../../../interFace_adapters/repositories/adminRepositories/adminRepositories";
import { S3Service } from "../../../config/s3Setup";
import EmailService from "../../../services/mailer";
import { authorization } from "../../../middleware/authMilddlewere";
import { UserRole } from "../../../utils/helpers/Enums";

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
  authorization(UserRole.Admin),
  adminController.getUsers.bind(adminController)
);
adminRouter.get(
  "/pendinglawyers",
  authorization(UserRole.Admin),
  adminController.getPendingApprovalLawyer.bind(adminController)
);
adminRouter.get(
  "/lawyers",
  authorization(UserRole.Admin),
  adminController.getLawyers.bind(adminController)
);
adminRouter.get(
  "/lawyer/:id",
  authorization(UserRole.Admin),
  adminController.lawyer.bind(adminController)
);
adminRouter.get(
  "/appointments",
  authorization(UserRole.Admin),
  adminController.getAllAppointments.bind(adminController)
);
adminRouter.get(
  "/viewAppointment/:appointmentId",
  authorization(UserRole.Admin),
  adminController.getAppointmentData.bind(adminController)
);
adminRouter.patch(
  "/verifylawyer/:id",
  authorization(UserRole.Admin),
  adminController.updateLawyer.bind(adminController)
);
adminRouter.patch(
  "/unverifylawyer/:id",
  authorization(UserRole.Admin),
  adminController.unVerifyLawyer.bind(adminController)
);
adminRouter.patch(
  "/blockandunblock/:id",
  authorization(UserRole.Admin),
  adminController.blockOrUnblock.bind(adminController)
);
adminRouter.get(
  "/statics",
  authorization(UserRole.Admin),
  adminController.getStaticsData.bind(adminController)
);
adminRouter.delete(
  "/logout",
  adminController.adminLogOut.bind(adminController)
);
