interface iUserRepository {
  userAlreadyExist(email: string): Promise<boolean>;
}

export default iUserRepository;
