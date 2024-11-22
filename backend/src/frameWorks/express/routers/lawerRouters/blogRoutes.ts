import { Router } from "express";
import { UserRole } from "../../../utils/helpers/Enums";
import { authorization } from "../../../middleware/authMilddlewere";
import { S3Service } from "../../../config/s3Setup";
import LawyerBlogRepository from "../../../../interFace_adapters/repositories/lawyerRepositories/laywerBlogRepostire";
import multer from "multer";
import LawyerBlogInteractor from "../../../../application/useCases/lawyer/lawyerBlogUseCase";
import BlogController from "../../../../interFace_adapters/controlers/lawyer/lawyerBlogController";

export const blogRoute = Router();
const IS3Services = new S3Service();
const repository = new LawyerBlogRepository();
const interactor = new LawyerBlogInteractor(repository, IS3Services);
const lawyerBlogController = new BlogController(interactor);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

blogRoute.post(
  "/",
  authorization(UserRole.Lawyer),
  upload.single("image"),
  lawyerBlogController.createBlog.bind(lawyerBlogController)
);
blogRoute.get(
  "/",
  authorization(UserRole.Lawyer),
  lawyerBlogController.getBlogs.bind(lawyerBlogController)
);
blogRoute.get(
  "/view/:id",
  // authorization(UserRole.Lawyer),
  lawyerBlogController.getOneBlog.bind(lawyerBlogController)
);
