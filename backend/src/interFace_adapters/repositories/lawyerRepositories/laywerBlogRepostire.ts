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
      const blogs = await Blog.find({ author: author })
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
      const blogs = await Blog.find({ publish: true })
        .skip(skip)
        .limit(limit as number)
        .sort({ createdAt: -1 })
        .populate("author", "userName profile_picture");
      return blogs;
    } catch (error: any) {
      throw error.message;
    }
  }
  async changeBlogStatus(id: string): Promise<IBlogOne | null> {
    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        throw new Error("Blog not found");
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { publish: !blog.publish, updatedAt: new Date() },
        { new: true }
      );

      return updatedBlog as IBlogOne | null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export default LawyerBlogRepository;
