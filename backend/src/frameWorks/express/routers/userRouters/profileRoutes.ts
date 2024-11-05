import { Router } from "express";
import { S3Service } from "../../../config/s3Setup";
import UserProfileRepository from "../../../../interFace_adapters/repositories/userRepositories/userProfileReposittory";
import userProfileInteractor from "../../../../application/useCases/user/profileUseCase";
import UserProfileController from "../../../../interFace_adapters/controlers/user/userProfileController";
import { authorization } from "../../../middleware/authMilddlewere";
export const profileRoute = Router();
import multer from "multer";
import { UserRole } from "../../../utils/helpers/Enums";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const IS3Services = new S3Service();
const repository = new UserProfileRepository();

const interactor = new userProfileInteractor(repository, IS3Services);

const userProfileController = new UserProfileController(interactor);

profileRoute.put(
  "/:id",
  authorization(UserRole.User),
  upload.single("profilePic"),
  userProfileController.updateProfileData.bind(userProfileController)
);
profileRoute.post(
  "/search",
  userProfileController.AISearch.bind(userProfileController)
);
profileRoute.patch(
  "/resetPassword/:id",
  authorization(UserRole.User),
  userProfileController.resetPassword.bind(userProfileController)
);
