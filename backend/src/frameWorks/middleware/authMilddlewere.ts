import { NextFunction, Request, Response } from "express";
import JwtToken from "../services/jwt";
import { config } from "../config/envConfig";
import UserAuthRepository from "../../interFace_adapters/repositories/userRepositories/userAuthRepository";
import LawyerAuthRepository from "../../interFace_adapters/repositories/lawyerRepositories/lawyerAuthRepository";
import { AuthenticatedRequest } from "../../domain/entites/imodels/iLawyer";
import AdminRepository from "../../interFace_adapters/repositories/adminRepositories/adminRepositories";

export const authorization =
  (allowedRoles: string) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userToken = req.cookies.auth_accessToken;
    const lawyerToken = req.cookies.auth_lawyerAccessToken;
    const adminToken = req.cookies.auth_adminAccessToken;
    console.log(adminToken, "is the parse admintoken");
    // if (!userToken && !lawyerToken) {
    //   return res.status(401).json({
    //     message: "Authorization denied. Please login. fuck in here",
    //     result: {},
    //     status: false,
    //   });
    // }

<<<<<<< HEAD
    const jwt = new JwtToken(config.JWT_SECRET, config.JWT_REFRESH_SECRET);
=======
    const jwt = new JwtToken(config.JWT_SECRET);
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
    let decodeToken;

    try {
      if (userToken && allowedRoles === "user") {
        decodeToken = jwt.verifyToken(userToken);
      } else if (lawyerToken && allowedRoles === "lawyer") {
        decodeToken = jwt.verifyToken(lawyerToken);
      } else if (adminToken && allowedRoles === "admin") {
        console.log("in here");
        decodeToken = jwt.verifyToken(adminToken);
      }

      if (!decodeToken || decodeToken.role !== allowedRoles) {
        console.log(decodeToken, "is the decoded Token");
        console.log(allowedRoles, "this is the allowed Role");
        console.log(decodeToken?.role, "is the role");
        return res.status(401).json({
          message: "Authorization denied. Invalid token or role mismatch.",
          result: {},
          status: false,
        });
      }

      if (decodeToken.role === "user") {
        const userRepository = new UserAuthRepository();
        const existUser = await userRepository.getId(decodeToken.id);
        if (!existUser) {
          return res.status(401).json({
            message: "Authorization denied. User does not exist.",
            result: {},
            status: false,
          });
        }
<<<<<<< HEAD

        if (existUser.block) {
          return res.status(401).json({
            message: "OOPS YOU HAVE BEEN BLOCKED BY ADMIN",
            result: {},
            status: false,
          });
        }
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
      } else if (decodeToken.role === "lawyer") {
        const lawyerRepository = new LawyerAuthRepository();
        const existLawyer = await lawyerRepository.getId(decodeToken.id);
        if (!existLawyer) {
          return res.status(401).json({
            message: "Authorization denied. Lawyer does not exist.",
            result: {},
            status: false,
          });
        }
<<<<<<< HEAD
        if (existLawyer.block) {
          return res.status(401).json({
            message: "OOPS YOU HAVE BEEN BLOCKED BY ADMIN",
            result: {},
            status: false,
          });
        }
      } else if (decodeToken.role === "admin") {
        const adminRepo = new AdminRepository();
        const existAdmin = await adminRepo.getAdmin(decodeToken.id);
        console.log(
          existAdmin,
          "is hteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        );
        if (!existAdmin) {
=======
      } else if (decodeToken.role === "admin") {
        const adminRepo = new AdminRepository();
        const existLawyer = await adminRepo.getAdmin(decodeToken.id);
        if (!existLawyer) {
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
          return res.status(401).json({
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
      return res.status(500).json({
        message: "Authorization failed due to server error.",
        result: {},
        status: false,
      });
    }
  };
