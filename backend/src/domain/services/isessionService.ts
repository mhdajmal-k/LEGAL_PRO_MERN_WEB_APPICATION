import { IUser } from "../entites/imodels/Iuser";

export interface ISessionService {
  createTempSession(user: IUser, otp: string): void;
  getDataFromSession(): { tempUser: IUser | null; otp: string | null };
  clearSession(): void;
}
