import { IUser } from "../../../domain/entites/imodels/Iuser";
import IUserResult from "../../../domain/entites/imodels/IUserResult";
import iAdminRepository from "../../../domain/entites/irepositories/IadminRepositries";
import IAdminInteractor from "../../../domain/entites/iuseCase/iadmin";
import { iJwtService } from "../../../domain/services/ijwtService";
import { config } from "../../../frameWorks/config/envConfig";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";
import { validatePassword } from "../../../frameWorks/utils/validatePassword";

class AdminInteractor implements IAdminInteractor {
  constructor(
    private readonly Repository: iAdminRepository,
    private readonly jwt: iJwtService
  ) {}

  async adminLogin(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }> {
    try {
      const { email, password } = user;
      let adminUser = await this.Repository.adminAlreadyExist(email, "admin");
      if (email !== config.ADMIN_EMAIL) {
        const error: CustomError = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
      }
      if (!adminUser) {
        if (password !== config.ADMIN_PASSWORD) {
          const error: CustomError = new Error("Invalid Credentials");
          error.statusCode = 401;
          throw error;
        }

        const adminData = {
          email: config.ADMIN_EMAIL,
          password: config.ADMIN_PASSWORD,
        };

        adminUser = await this.Repository.createAdmin(adminData, "admin");
      }

      if (!adminUser || !adminUser.password) {
        console.log("hi");
        const error: CustomError = new Error("Failed to retrieve user data.");
        error.statusCode = 500;
        throw error;
      }

      const validPassword = validatePassword(password, adminUser.password);
      if (!validPassword) {
        return {
          status: false,
          message: "Incorrect Password",
          result: null,
        };
      }
      const jwtToken = this.jwt.generateToken(adminUser._id, "admin");
      const { password: userPassword, ...userDataWithoutPassword } = adminUser;

      return {
        status: true,
        message: "Logged in Successfully",
        result: {
          user: userDataWithoutPassword,
          tokenJwt: jwtToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

export default AdminInteractor;
