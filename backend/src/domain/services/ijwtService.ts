import { ILawyer } from "../entites/imodels/iLawyer";
import { IUser } from "../entites/imodels/Iuser";

export interface iJwtService {
  generateToken(userData: IUser | ILawyer, role: string): string;
  verifyToken(Token: string): { id: string; role: string } | null;
<<<<<<< HEAD
  generateRefreshToken(userData: IUser | ILawyer, role: string): string;
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
}
