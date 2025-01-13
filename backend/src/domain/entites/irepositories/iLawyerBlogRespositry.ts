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
  getAllBlogs(limit: number | undefined, skip: number): Promise<IBlog[]>;
  getOneBlog(id: string): Promise<IBlogOne | null>;
  updateBlog(
    blogId: string,
    updateData: {
      title?: string;
      content?: string;
      category?: string;

    },
    image?: string
  ): Promise<IBlog>;
  changeBlogStatus(id: string): Promise<boolean | null>;
  getBlogsCount(): Promise<number>;
}
export default ILawyerBlogRepository;
