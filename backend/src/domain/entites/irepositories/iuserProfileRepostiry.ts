interface IUserProfileRepository {
  updateProfileData(data: any): Promise<any>;
  validUserPassword(
    currentPassword: string,
    id: string,
    newPassword: string
  ): Promise<any>;
}
export default IUserProfileRepository;
