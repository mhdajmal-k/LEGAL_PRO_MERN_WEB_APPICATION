import { ILawyer } from "../../domain/entites/imodels/iLawyer";
import { IUser } from "../../domain/entites/imodels/Iuser";
import { iJwtService } from "../../domain/services/ijwtService";
import jwt from "jsonwebtoken";
import { UserRole } from "../utils/helpers/Enums";

class JwtToken implements iJwtService {
  constructor(
    private readonly jwtSecret: string,
    private readonly jwtRefreshTokenSecret: string
  ) {}

  generateToken(id: IUser | ILawyer, role: UserRole): string {
    const token = jwt.sign({ id, role }, this.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }

  verifyToken(token: string): { id: string; role: UserRole } | null {
    try {
      const decodedToken = jwt.verify(token, this.jwtSecret) as {
        id: string;
        role: UserRole;
      };
      return decodedToken;
    } catch (error) {
      console.error("Invalid or expired token", error);
      return null;
    }
  }
  VerifyTokenRefresh(token: string): { id: string; role: UserRole } | null {
    try {
      const decodedToken = jwt.verify(token, this.jwtRefreshTokenSecret) as {
        id: string;
        role: UserRole;
      };
      return decodedToken;
    } catch (error) {
      console.error("Invalid or expired token", error);
      return null;
    }
  }

  generateRefreshToken(id: IUser | ILawyer, role: string): string {
    const refreshToken = jwt.sign({ id, role }, this.jwtRefreshTokenSecret, {
      expiresIn: "7d",
    });
    return refreshToken;
  }
}

export default JwtToken;
