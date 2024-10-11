import { ILawyer } from "../../domain/entites/imodels/iLawyer";
import { IUser } from "../../domain/entites/imodels/Iuser";
import { iJwtService } from "../../domain/services/ijwtService";
import jwt from "jsonwebtoken";

class JwtToken implements iJwtService {
  constructor(
    private readonly jwtSecret: string,
    private readonly jwtRefreshTokenSecret: string
  ) {}

  // constructor(private readonly jwtSecret: string) {
  //   this.jwtSecret = jwtSecret;
  // }
  generateToken(id: IUser | ILawyer, role: string): string {
    const token = jwt.sign({ id, role }, this.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }

  // verifyToken(token: string): { id: string; role: string } | null {
  //   try {
  //     const decodedToken = jwt.verify(token, this.jwtSecret) as {
  //       id: string;
  //       role: string;
  //     };
  //     return decodedToken;

  verifyToken(Token: string): { id: string; role: string } | null {
    try {
      console.log("in the verify Token");
      const decodeToken = jwt.verify(Token, this.jwtSecret) as {
        id: string;
        role: string;
      };
      console.log(decodeToken, "is the decoded in verify Token");
      return decodeToken;
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
