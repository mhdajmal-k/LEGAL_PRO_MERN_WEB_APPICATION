import { NextFunction, Request, Response } from "express";
import JwtToken from "../services/jwt";
import { config } from "../config/envConfig";
import UserAuthRepository from "../../interFace_adapters/repositories/userRepositories/userAuthRepository";
import LawyerAuthRepository from "../../interFace_adapters/repositories/lawyerRepositories/lawyerAuthRepository";
import { AuthenticatedRequest } from "../../domain/entites/imodels/iLawyer";
import AdminRepository from "../../interFace_adapters/repositories/adminRepositories/adminRepositories";
import { HttpStatusCode, MessageError, UserRole } from "../utils/helpers/Enums";

export const authorization =
  (allowedRoles: UserRole) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userToken = req.cookies.User_AccessToken;
    const lawyerToken = req.cookies.Lawyer_AccessToken;
    const adminToken = req.cookies.auth_adminAccessToken;

    const jwt = new JwtToken(config.JWT_SECRET, config.JWT_REFRESH_SECRET);
    let decodeToken;

    try {
      if (userToken && allowedRoles === UserRole.User) {
        decodeToken = jwt.verifyToken(userToken);
      } else if (lawyerToken && allowedRoles === UserRole.Lawyer) {
        decodeToken = jwt.verifyToken(lawyerToken);
      } else if (adminToken && allowedRoles === UserRole.Admin) {
        decodeToken = jwt.verifyToken(adminToken);
      }

      if (!decodeToken || decodeToken.role !== allowedRoles) {
        return res.status(HttpStatusCode.Unauthorized).json({
          message: `Authorization denied. Invalid token`,
          result: allowedRoles,
          status: false,
        });
      }

      if (decodeToken.role === UserRole.User) {
        const userRepository = new UserAuthRepository();
        const existUser = await userRepository.getId(decodeToken.id);
        if (!existUser || existUser.block) {
          return res.status(HttpStatusCode.Unauthorized).json({
            message: existUser
              ? "Authorization denied. User does not exist."
              : "OOPS YOU HAVE BEEN BLOCKED BY ADMIN",
            result: {},
            status: false,
          });
        }
      } else if (decodeToken.role === UserRole.Lawyer) {
        const lawyerRepository = new LawyerAuthRepository();
        const existLawyer = await lawyerRepository.getId(decodeToken.id);
        if (!existLawyer || existLawyer.block) {
          return res.status(HttpStatusCode.Unauthorized).json({
            message: existLawyer
              ? "Authorization denied. Lawyer does not exist."
              : MessageError.Blocked,
            result: {},
            status: false,
          });
        }
      } else if (decodeToken.role === UserRole.Admin) {
        const adminRepo = new AdminRepository();
        const existAdmin = await adminRepo.getAdmin(decodeToken.id);
        if (!existAdmin) {
          return res.status(HttpStatusCode.Unauthorized).json({
            message: "Authorization denied,admin does not exist.",
            result: {},
            status: false,
          });
        }
      }

      req.user = { id: decodeToken.id };
      next();
    } catch (error) {
      console.error("Authorization Error:", error);
      return res.status(HttpStatusCode.InternalServerError).json({
        message: "Authorization failed due to server error.",
        result: {},
        status: false,
      });
    }
  };
