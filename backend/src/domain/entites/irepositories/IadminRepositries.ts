import { Types } from "mongoose";
interface iAdminRepository {
  adminAlreadyExist(email: string, role: string): Promise<any>;
  createAdmin(data: any, role: string): Promise<any>;
}

export default iAdminRepository;
