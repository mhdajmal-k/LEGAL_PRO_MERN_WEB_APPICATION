export default interface UserState {
  userInfo: {
    name: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export default interface userSignUp {
  name?: string;
  email?: string;
  password?: string;
}
