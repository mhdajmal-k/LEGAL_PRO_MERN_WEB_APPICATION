interface SignUpResult {
  tempToken: string;
}

export interface LawyerSignUpResponse {
  status: number;
  message: string;
  result: SignUpResult | null | string;
}

export interface response {
  status: boolean; //changed
  message: string;
  result: null | string | any;
}

export interface LoginType {
  email: string;
  password: string;
}
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
  courtPracticeArea: string;
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
  courtPracticeArea: string;
  verified: boolean;
  city: string;
  state: string;
  about: string;
  languages_spoken: string[];
  practice_area: string[];
  certifications: Certification[];
}
export interface SlotData {
  _id: string;
  date: string;
  availability: TimeSlot[];
  fees: number;
}

export interface TimeSlot {
  timeSlot: string;
  _id?: string;
  status: boolean;
  fee: number;
}

interface BasicLawyerDetails {
  _id: string;
  userName: string;
  profile_picture: string;
  city: string;
  state: string;
  designation: string;
  years_of_experience: string;
}

export interface Slot {
  _id: string;
  date: Date;
  availability: TimeSlot[];
  fees: number;
}

export interface FetchedSlotData {
  lawyerDetails: BasicLawyerDetails;
  slots: Slot[];
}

export interface BlogType {
  _id: string;
  title: string;
  category: string;
  content: string;
  image?: string;
  author: {
    userName: string;
    profile_picture: string;
  };
  createdAt: string;
}
