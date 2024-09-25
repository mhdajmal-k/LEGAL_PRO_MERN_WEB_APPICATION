import { IUser } from "../../domain/entites/imodels/Iuser";
import { iJwtService } from "../../domain/services/ijwtService";
import jwt from "jsonwebtoken";

class JwtToken implements iJwtService {
  constructor(private readonly jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }
  generateToken(userId: IUser, role: string): string {
    const token = jwt.sign({ userId, role: "user" }, this.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }
  //   verifyToken(Token: string): boolean {}
}

export default JwtToken;
