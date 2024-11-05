import { UserRole } from "../../frameWorks/utils/helpers/Enums";
import { ILawyer } from "../entites/imodels/iLawyer";
import { IUser } from "../entites/imodels/Iuser";

export interface iJwtService {
  generateToken(userData: IUser | ILawyer, role: UserRole): string;
  verifyToken(Token: string): { id: string; role: UserRole } | null;
  generateRefreshToken(userData: IUser | ILawyer, role: UserRole): string;
  VerifyTokenRefresh(Token: string): { id: string; role: UserRole } | null;
}
