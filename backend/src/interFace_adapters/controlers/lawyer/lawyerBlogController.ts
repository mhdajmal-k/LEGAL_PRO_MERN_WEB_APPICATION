import { Request, Response, NextFunction } from "express";
import ILawyerBlogInteractor from "../../../domain/entites/iuseCase/ILawyerBlog";
import { HttpStatusCode } from "../../../frameWorks/utils/helpers/Enums";
import { AuthenticatedRequest } from "../../../domain/entites/imodels/iLawyer";

class BlogController {
  constructor(private lawyerBlogInteractor: ILawyerBlogInteractor) {}
  async createBlog(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const author = req.user?.id;
      const { title, content, category } = req.body;
      const file = req.file;

      if (!file) {
        res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "blog image is required",
          result: {},
        });
        return;
      }
      const response = await this.lawyerBlogInteractor.createBlog(
        title,
        content,
        author as string,
        category,
        file
      );

      if (response.status) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  ///////////////

  async getBlogs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const author = req.user?.id;
      const { page, limit } = req.query;

      const parsedPage = page ? parseInt(page as string) : undefined;
      const parsedLimit = limit ? parseInt(limit as string) : undefined;

      const response = await this.lawyerBlogInteractor.getBlogs(
        parsedPage,
        parsedLimit,
        author
      );

      res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }

  ////////////

  async getOneBlog(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "blog id is required",
          result: {},
        });
        return;
      }
      const response = await this.lawyerBlogInteractor.getOneBlogById(
        String(id)
      );
      res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BlogController;
