import { ILawyer } from "../../domain/entites/imodels/iLawyer";
import { IUser } from "../../domain/entites/imodels/Iuser";
import { iJwtService } from "../../domain/services/ijwtService";
import jwt from "jsonwebtoken";

class JwtToken implements iJwtService {
  constructor(private readonly jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }
  generateToken(id: IUser | ILawyer, role: string): string {
    const token = jwt.sign({ id, role }, this.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }
  verifyToken(Token: string): { id: string; role: string } | null {
    try {
      const decodeToken = jwt.verify(Token, this.jwtSecret) as {
        id: string;
        role: string;
      };
      console.log(decodeToken, "is the decoded");
      return decodeToken;
    } catch (error) {
      console.error("Invalid or expired token", error);
      return null;
    }
  }
}

export default JwtToken;
