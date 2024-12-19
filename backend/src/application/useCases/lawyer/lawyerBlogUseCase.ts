import { IBlog, IBlogOne } from "../../../domain/entites/imodels/iBlog";
import ILawyerBlogRepository from "../../../domain/entites/irepositories/iLawyerBlogRespositry";
import ILawyerBlogInteractor from "../../../domain/entites/iuseCase/ILawyerBlog";
import { S3Service } from "../../../frameWorks/config/s3Setup";
import { HttpStatusCode } from "../../../frameWorks/utils/helpers/Enums";

class LawyerBlogInteractor implements ILawyerBlogInteractor {
  constructor(
    private readonly Repository: ILawyerBlogRepository,
    private s3Service: S3Service
  ) {}
  async createBlog(
    title: string,
    content: string,
    author: string,
    category: string,
    file?: Express.Multer.File
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      let image;
      if (file) {
        const key = `lawyer-blogImage/${Date.now()}-${file.originalname}`;
        const uploadPromise = this.s3Service.uploadFile(file, key);
        image = key;
      }
      const createBlog = await this.Repository.createBlog(
        author,
        content,
        title,
        category,
        image as string
      );
      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "blog Created",
        result: createBlog,
      };
    } catch (error) {
      throw error;
    }
  }
  async getBlogs(
    page?: number,
    limit?: number,
    author?: string | undefined
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlog[];
  }> {
    try {
      const lawyerBlog = await this.Repository.getLawyerBlogs(
        author,
        limit,
        page
      );
      // const totalPages = Math.ceil(totalLawyers / limit);
      const updatedBlog = await Promise.all(
        lawyerBlog.map(async (blog: any) => {
          if (blog.author?.profile_picture) {
            blog.author.profile_picture = await this.s3Service.fetchFile(
              blog.author.profile_picture
            );
          }

          if (blog.image) {
            blog.image = await this.s3Service.fetchFile(blog.image);
          }

          return blog;
        })
      );

      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "blog Created",
        result: updatedBlog,
      };
    } catch (error: any) {
      throw error.message;
    }
  }
  async getOneBlogById(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlogOne;
  }> {
    try {
      const blog = await this.Repository.getOneBlog(id);
      if (blog) {
        blog.image = await this.s3Service.fetchFile(blog.image);
        blog.author.profile_picture = await this.s3Service.fetchFile(
          blog.author.profile_picture
        );
      }

      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "",
        result: blog as IBlogOne,
      };
    } catch (error) {
      throw error;
    }
  }
  async changeBlogStatusById(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlogOne;
  }> {
    try {
      const blog = await this.Repository.changeBlogStatus(id);
      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "blog updated SuccessFully",
        result: blog as IBlogOne,
      };
    } catch (error: any) {
      throw error.message;
    }
  }
}
export default LawyerBlogInteractor;
