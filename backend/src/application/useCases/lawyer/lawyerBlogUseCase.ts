import { IBlog, IBlogOne } from "../../../domain/entites/imodels/iBlog";
import ILawyerBlogRepository from "../../../domain/entites/irepositories/iLawyerBlogRespositry";
import ILawyerBlogInteractor from "../../../domain/entites/iuseCase/ILawyerBlog";
import { S3Service } from "../../../frameWorks/config/s3Setup";
import { HttpStatusCode } from "../../../frameWorks/utils/helpers/Enums";

class LawyerBlogInteractor implements ILawyerBlogInteractor {
  constructor(
    private readonly Repository: ILawyerBlogRepository,
    private s3Service: S3Service
  ) { }
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
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }
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
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }
    }
  }
  async updateBlog(
    blogId: string,
    updateData: {
      title?: string;
      content?: string;
      author: string;
      category?: string;
      file?: Express.Multer.File
    }
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlog;
  }> {
    try {
      const existingBlog = await this.Repository.getOneBlog(blogId);

      if (!existingBlog) {
        throw new Error("Blog not found");
      }

      let image;
      if (updateData.file) {
        const key = `lawyer-blogImage/${Date.now()}-${updateData.file.originalname}`;
        const uploadPromise = this.s3Service.uploadFile(updateData.file, key);
        image = key;
      }
      const updatedBlog = await this.Repository.updateBlog(blogId, updateData, image);

      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "Blog Updated",
        result: updatedBlog,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }

    }
  }
  async changeBlogStatusById(blogId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }> {
    try {
      console.log("called in int useCases");
      const blog = await this.Repository.changeBlogStatus(blogId);
      if (!blog) {
        return {
          status: true,
          statusCode: HttpStatusCode.OK,
          message: "error during  blog deletion",
          result: [],
        };
      }
      console.log(blog, "is expecting the deleted Blog");
      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "blog deleted successFully",
        result: [],
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }
    }
  }
}
export default LawyerBlogInteractor;
