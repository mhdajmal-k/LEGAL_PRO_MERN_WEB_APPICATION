import { Router } from "express";

export const userLawyerRoute = Router();
import multer from "multer";
import UserLawyerRepositories from "../../../../interFace_adapters/repositories/userRepositories/userLawyerRepositoires";
import UserLawyerInteractor from "../../../../application/useCases/user/userLawyerUseCase";
import UserProfileController from "../../../../interFace_adapters/controlers/user/userProfileController";
import UserLawyerController from "../../../../interFace_adapters/controlers/user/lawyerControler";
import { S3Service } from "../../../config/s3Setup";
import { authorization } from "../../../middleware/authMilddlewere";
import { UserRole } from "../../../utils/helpers/Enums";
const IS3Services = new S3Service();
const repository = new UserLawyerRepositories();

const interactor = new UserLawyerInteractor(repository, IS3Services);

const userLawyerController = new UserLawyerController(interactor);

userLawyerRoute.get(
  "/",
  userLawyerController.getVerifiedLawyers.bind(userLawyerController)
);

userLawyerRoute.get(
  "/profile/:id",
  userLawyerController.getLawyerById.bind(userLawyerController)
);
userLawyerRoute.get(
  "/slots/:id",
  authorization(UserRole.User),
  userLawyerController.lawyerSlot.bind(userLawyerController)
);
