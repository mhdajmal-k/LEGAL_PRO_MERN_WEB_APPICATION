interface SignUpResult {
  tempToken: string;
}

export interface LawyerSignUpResponse {
  status: number;
  message: string;
  result: SignUpResult | null | string;
}

export interface response {
  status: number;
  message: string;
  result: null | string | any;
}

export interface LoginType {
  email: string;
  password: string;
}
<<<<<<< HEAD
export interface LawyerInfo {
  _id: string;
  userName: string;
  email: string;
  password: string;
  profile_picture?: string;
  gender?: "Male" | "Female" | "Other";
  languages_spoken: string[];
  city?: string;
  state?: string;
  verified?: "verified" | "unverified";
  practice_area: string[];
  block: boolean;
  certifications: Certification[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  designation: string;
  years_of_experience: number;
  about: string;
}

interface Certification {
  certificateType: string;
  enrolmentNumber: string;
  certificate: string;
  _id?: string;
}
export interface Lawyer {
  _id: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  block: boolean;
  profile_picture: string;
  designation: string;
  years_of_experience: string;
  verified: boolean;
  city: string;
  state: string;
  languages_spoken: string[];
  practice_area: string[];
  certifications: Certification[];
}
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
