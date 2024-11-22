import { Types } from "mongoose";
import { ITransaction } from "../imodels/ITransaction";

interface iUserRepository {
  userAlreadyExist(email: string): Promise<boolean>;
  createUser(data: object): Promise<any>;
  addToWallet(id: string, money: string | number): Promise<boolean>;
  updatePassword(password: string, id: string): Promise<any>;
  createUserFromGoogle(data: object): Promise<any>;
  validUser(email: string): Promise<any>;
  getId(id: string): Promise<Types.ObjectId | null | any>;
  createTransaction(data: {
    userId: string;
    amount: number;
    type: string;
    description: string;
  }): Promise<boolean>;
}

export default iUserRepository;
