export default interface IUserResult {
  user: {
    userName: string;
    email: string;
    block: boolean;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  tokenJwt: string | "";
}
