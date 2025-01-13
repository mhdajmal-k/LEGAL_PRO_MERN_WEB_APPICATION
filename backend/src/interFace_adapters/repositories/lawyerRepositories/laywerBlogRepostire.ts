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
      const blogs = await Blog.find({
        $and: [{ author: author }, { publish: true }],
      })
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
  async getAllBlogs(limit: number | undefined, skip: number): Promise<IBlog[]> {
    try {
      const blogs = await Blog.find({ publish: true })
        .skip(skip)
        .limit(limit as number)
        .sort({ createdAt: -1 })
        .populate("author", "userName profile_picture");
      return blogs;
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }
    }
  }
  async changeBlogStatus(id: string): Promise<boolean | null> {
    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        throw new Error("Blog not found");
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { publish: false, updatedAt: new Date() },
        { new: true }
      );

      return updatedBlog as boolean | null;
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      }
    }
  }
  async getBlogsCount(): Promise<number> {
    try {
      const query: any = { publish: true };
      const count = await Blog.countDocuments(query);
      return count;
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
      category?: string;

    }, image?: string
  ): Promise<IBlog> {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          ...updateData,
          image,
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!updatedBlog) {
        throw new Error("Blog not found");
      }

      return updatedBlog;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          error.message || "An unexpected error occurred",
        );
      }
      throw error;
    }
  }
}
export default LawyerBlogRepository;
