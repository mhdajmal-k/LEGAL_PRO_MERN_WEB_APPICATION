import { NextFunction, Request, Response } from "express";
import JwtToken from "../services/jwt";
import { config } from "../config/envConfig";
import UserAuthRepository from "../../interFace_adapters/repositories/userRepositories/userAuthRepository";
import LawyerAuthRepository from "../../interFace_adapters/repositories/lawyerRepositories/lawyerAuthRepository";
import { AuthenticatedRequest } from "../../domain/entites/imodels/iLawyer";

export const authorization =
  (allowedRoles: string) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userToken = req.cookies.auth_accessToken;
    const lawyerToken = req.cookies.auth_lawyerAccessToken;
    if (!userToken && !lawyerToken) {
      return res.status(401).json({
        message: "Authorization denied. Please login.",
        result: {},
        status: false,
      });
    }

    const jwt = new JwtToken(config.JWT_SECRET);
    let decodeToken;

    try {
      if (userToken && allowedRoles === "user") {
        decodeToken = jwt.verifyToken(userToken);
      } else if (lawyerToken && allowedRoles === "lawyer") {
        decodeToken = jwt.verifyToken(lawyerToken);
      }

      if (!decodeToken || decodeToken.role !== allowedRoles) {
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
