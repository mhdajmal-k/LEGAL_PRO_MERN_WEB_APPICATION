import { ILawyer } from "../entites/imodels/iLawyer";
import { IUser } from "../entites/imodels/Iuser";

export interface iJwtService {
  generateToken(userData: IUser | ILawyer, role: string): string;
  verifyToken(Token: string): { id: string; role: string } | null;
  generateRefreshToken(userData: IUser | ILawyer, role: string): string;
}
