export default interface UserState {
  userInfo: {
    userName: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export default interface userSignUp {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
