import { Types } from "mongoose";

interface iUserRepository {
  userAlreadyExist(email: string): Promise<boolean>;
  createUser(data: object): Promise<any>;
  createUserFromGoogle(data: object): Promise<any>;
  validUser(email: string): Promise<any>;
  getId(id: string): Promise<Types.ObjectId | null>;
}

export default iUserRepository;
