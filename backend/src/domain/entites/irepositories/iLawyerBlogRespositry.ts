import { IBlog, IBlogOne } from "../imodels/iBlog";

interface ILawyerBlogRepository {
  createBlog(
    author: string,
    content: string,
    title: string,
    category: string,
    image: string
  ): Promise<IBlog>;
  getLawyerBlogs(
    author: string | undefined,
    limit: number | undefined,
    page: number | undefined
  ): Promise<IBlog[]>;
  getAllBlogs(
    limit: number | undefined,
    page: number | undefined
  ): Promise<IBlog[]>;
  getOneBlog(id: string): Promise<IBlogOne | null>;
  changeBlogStatus(id: string): Promise<IBlogOne | null>;
}
export default ILawyerBlogRepository;
