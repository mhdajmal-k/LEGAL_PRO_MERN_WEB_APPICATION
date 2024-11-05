import { Router } from "express";
import { S3Service } from "../../../config/s3Setup";
import AppointmentController from "../../../../interFace_adapters/controlers/user/appoinementController";
import UserAppointmentRepositories from "../../../../interFace_adapters/repositories/userRepositories/userAppointmentRepository";
import UserAppointmentInteractor from "../../../../application/useCases/user/appointmentUseCase";
import UserLawyerRepositories from "../../../../interFace_adapters/repositories/userRepositories/userLawyerRepositoires";
export const appointmentRoute = Router();
import multer from "multer";
import { authorization } from "../../../middleware/authMilddlewere";
import EmailService from "../../../services/mailer";
import UserAuthRepository from "../../../../interFace_adapters/repositories/userRepositories/userAuthRepository";
import { UserRole } from "../../../utils/helpers/Enums";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const IS3Services = new S3Service();
const repository = new UserAppointmentRepositories();
const lawyerRepository = new UserLawyerRepositories();

const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const userRepository = new UserAuthRepository();
const interactor = new UserAppointmentInteractor(
  lawyerRepository,
  repository,
  IS3Services,
  emailService,
  userRepository
);

export const appointmentController = new AppointmentController(interactor);

appointmentRoute.post(
  "/",
  authorization(UserRole.User),
  upload.single("image"),
  appointmentController.createAppointment.bind(appointmentController)
);
appointmentRoute.get(
  "/list",
  authorization(UserRole.User),
  appointmentController.getAllAppointmentBasedStatus.bind(appointmentController)
);
appointmentRoute.get(
  "/:appointmentId",
  authorization(UserRole.User),
  appointmentController.getAppointment.bind(appointmentController)
);
// appointmentRoute.get(
//   "/view",
//   // authorization("user"),
//   appointmentController.verifyPayment.bind(appointmentController)
// );
appointmentRoute.post(
  "/createPayment",
  authorization(UserRole.User),
  appointmentController.createPayment.bind(appointmentController)
);
appointmentRoute.post(
  "/verifyPayment",
  authorization(UserRole.User),
  appointmentController.verifyPayment.bind(appointmentController)
);
appointmentRoute.post(
  "/failedPayment/:appointmentId",
  authorization(UserRole.User),
  appointmentController.failedPayment.bind(appointmentController)
);
appointmentRoute.patch(
  "/:appointmentId",
  authorization(UserRole.User),
  appointmentController.cancelAppointment.bind(appointmentController)
);
appointmentRoute.get(
  "/checkRefundStatus/:appointmentId",
  authorization(UserRole.User),
  appointmentController.checkRefundStatus.bind(appointmentController)
);
