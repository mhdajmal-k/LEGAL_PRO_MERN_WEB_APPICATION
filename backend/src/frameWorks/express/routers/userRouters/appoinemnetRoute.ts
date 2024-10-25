import { Router } from "express";
import { S3Service } from "../../../config/s3Setup";
import AppointmentController from "../../../../interFace_adapters/controlers/user/appoinementController";
import UserAppointmentRepositories from "../../../../interFace_adapters/repositories/userRepositories/userAppointmentRepository";
import UserAppointmentInteractor from "../../../../application/useCases/user/appointmentUseCase";
import UserLawyerRepositories from "../../../../interFace_adapters/repositories/userRepositories/userLawyerRepositoires";
export const appointmentRoute = Router();
import multer from "multer";
import { authorization } from "../../../middleware/authMilddlewere";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const IS3Services = new S3Service();
const repository = new UserAppointmentRepositories();
const lawyerRepository = new UserLawyerRepositories();

const interactor = new UserAppointmentInteractor(
  lawyerRepository,
  repository,
  IS3Services
);

export const appointmentController = new AppointmentController(interactor);

appointmentRoute.post(
  "/",
  authorization("user"),
  upload.single("image"),
  appointmentController.createAppointment.bind(appointmentController)
);
appointmentRoute.get(
  "/list",
  authorization("user"),
  appointmentController.getAllAppointmentBasedStatus.bind(appointmentController)
);
appointmentRoute.get(
  "/:appointmentId",
  authorization("user"),
  appointmentController.getAppointment.bind(appointmentController)
);
// appointmentRoute.get(
//   "/view",
//   // authorization("user"),
//   appointmentController.verifyPayment.bind(appointmentController)
// );
appointmentRoute.post(
  "/createPayment",
  authorization("user"),
  appointmentController.createPayment.bind(appointmentController)
);
appointmentRoute.post(
  "/verifyPayment",
  authorization("user"),
  appointmentController.verifyPayment.bind(appointmentController)
);
