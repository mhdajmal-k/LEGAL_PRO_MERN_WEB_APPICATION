interface iUserRepository {
  userAlreadyExist(email: string): Promise<boolean>;
  createUser(data: object): Promise<any>;
}

export default iUserRepository;
