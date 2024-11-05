import { Router } from "express";
import { authorization } from "../../../middleware/authMilddlewere";
import LawyerAppointmentRepository from "../../../../interFace_adapters/repositories/lawyerRepositories/lawyerAppointmentRepository";
import LawyerAppointmentInteractor from "../../../../application/useCases/lawyer/lawerAppointmentUseCase";
import AppointmentController from "../../../../interFace_adapters/controlers/user/appoinementController";
import LawyerAppointmentController from "../../../../interFace_adapters/controlers/lawyer/lawyerAppointmentController";
import { S3Service } from "../../../config/s3Setup";
import EmailService from "../../../services/mailer";
import UserAuthRepository from "../../../../interFace_adapters/repositories/userRepositories/userAuthRepository";
import UserLawyerRepositories from "../../../../interFace_adapters/repositories/userRepositories/userLawyerRepositoires";
import { UserRole } from "../../../utils/helpers/Enums";
export const lawyerAppointmentRoute = Router();
const IS3Services = new S3Service();
const repository = new LawyerAppointmentRepository();
const emailService = new EmailService(
  process.env.EMAIL_ID as string,
  process.env.EMAIL_PASS as string
);
const userRepository = new UserAuthRepository();
const lawyerRepository = new UserLawyerRepositories();

const interactor = new LawyerAppointmentInteractor(
  repository,
  IS3Services,
  emailService,
  userRepository,
  lawyerRepository
);
const lawyerAppointmentController = new LawyerAppointmentController(interactor);

lawyerAppointmentRoute.get(
  "/list",
  authorization(UserRole.Lawyer),
  lawyerAppointmentController.getAllAppointmentBasedStatus.bind(
    lawyerAppointmentController
  )
);
lawyerAppointmentRoute.get(
  "/view/:appointmentId",
  authorization(UserRole.Lawyer),
  lawyerAppointmentController.getAppointment.bind(lawyerAppointmentController)
);
lawyerAppointmentRoute.patch(
  "/cancel/:appointmentId",
  authorization(UserRole.Lawyer),
  lawyerAppointmentController.cancelAppointment.bind(
    lawyerAppointmentController
  )
);
