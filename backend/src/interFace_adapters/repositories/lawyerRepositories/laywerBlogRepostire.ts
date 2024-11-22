import { IBlog, IBlogOne } from "../../../domain/entites/imodels/iBlog";
import ILawyerBlogRepository from "../../../domain/entites/irepositories/iLawyerBlogRespositry";
import Blog from "../../../frameWorks/database/models/blogModel";

class LawyerBlogRepository implements ILawyerBlogRepository {
  async createBlog(
    author: string,
    content: string,
    title: string,
    category: string,
    image: string
  ): Promise<IBlog> {
    try {
      const newBlog = new Blog({
        author,
        content,
        title,
        category,
        image,
      });
      await newBlog.save();
      return newBlog;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getLawyerBlogs(
    author: string,
    limit: number,
    page: number
  ): Promise<IBlog[]> {
    try {
      const skip = (page - 1) * limit;
      const blogs = await Blog.find({ author: "67136cfb24ccd19a7be5e5b7" })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate("author", "userName profile_picture");
      console.log(blogs, "in the repo");
      return blogs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getOneBlog(id: string): Promise<IBlogOne | null> {
    try {
      console.log(id, "is the id from the repo");
      const blog = await Blog.findById(id).populate(
        "author",
        "userName profile_picture"
      );
      return blog as IBlogOne | null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAllBlogs(
    limit: number | undefined,
    page: number | undefined
  ): Promise<IBlog[]> {
    try {
      const skip = (page! - 1) * limit!;
      const blogs = await Blog.find()
        .skip(skip)
        .limit(limit as number)
        .sort({ createdAt: -1 })
        .populate("author", "userName profile_picture");
      console.log(blogs, "in the repo");
      return blogs;
    } catch (error) {
      throw error;
    }
  }
}
export default LawyerBlogRepository;
