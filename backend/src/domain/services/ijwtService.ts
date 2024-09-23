import { IUser } from "../entites/imodels/Iuser";

export interface iJwtService {
  generateToken(userData: IUser, role: string): string;
  verifyToken(Token: string): boolean;
}
