import { IBlog, IBlogOne } from "../imodels/iBlog";

interface ILawyerBlogInteractor {
  createBlog(
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
  }>;
  getBlogs(
    page?: number,
    limit?: number,
    author?: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlog[];
  }>;
  updateBlog(
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
  }>;
  getOneBlogById(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlogOne;
  }>;
  changeBlogStatusById(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;
}
export default ILawyerBlogInteractor;
