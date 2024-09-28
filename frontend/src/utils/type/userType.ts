// Use named exports for each interface
export interface UserState {
  userInfo: {
    userName: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export interface userSignUp {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface userLoginData {
  email: string;
  password: string;
}

export interface lawyerInfo {
  id: string;
  name: string;
  email?: string;
}

export interface LawyerSignUp {
  userName?: string;
  email?: string;
  gender: string;
  city: string;
  state: string;
  zipCode: string;
  password?: string;
}
