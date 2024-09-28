import { ILawyer } from "../../domain/entites/imodels/iLawyer";
import { IUser } from "../../domain/entites/imodels/Iuser";
import { iJwtService } from "../../domain/services/ijwtService";
import jwt from "jsonwebtoken";

class JwtToken implements iJwtService {
  constructor(private readonly jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }
  generateToken(userId: IUser | ILawyer, role: string): string {
    const token = jwt.sign({ userId, role }, this.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }
  //   verifyToken(Token: string): boolean {}
}

export default JwtToken;
