import { Document } from "mongoose";

interface ICertification {
  certificateType: string;
  enrolmentNumber: string;
  certificate: string;
}

export interface ILawyer extends Document {
  userName: string;
  email: string;
  password: string;
  profile_picture?: string;
  gender?: string;
  years_of_experience?: number;
  certifications?: ICertification[];
  languages_spoken?: string[];
  designation?: string;
  about?: string;
  city?: string;
  state?: string;
  verified?: boolean;
  practice_area?: string[];
  block?: boolean;
}
