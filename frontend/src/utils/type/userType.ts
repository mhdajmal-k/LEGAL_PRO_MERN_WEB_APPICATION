export interface UserState {
  userInfo: {
    userName: string;
    email: string;
    phoneNumber?: string | "";
  } | null;
  loading: boolean;
  error: string | null;
}

export interface userSignUp {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  userInfo?: any;
  loading?: false;
  error?: null;
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

export interface LawyerSignUpData {
  userName?: string;
  email?: string;
  gender?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  password?: string;
  image?: string;
}

export interface LawyerProfessionalData {
  practiceArea: string[] | any;
  yearsOfExperience: string;
  barCouncilNumber: string;
  stateBarCouncilNumber?: string;
  designation: string;
  courtPracticeArea: string;
  languages: string[];
  aboutMe: string;
  selectedImageIndia?: File;
  selectedImageKerala?: File;
}
