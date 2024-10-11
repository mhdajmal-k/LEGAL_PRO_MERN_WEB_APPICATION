import { Request } from "express";
import { Document } from "mongoose";

interface ICertification {
  certificateType?: string;
  enrolmentNumber?: string;
  certificate?: string;
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
  zipcode?: string;
  verified?: boolean;
  practice_area?: string[];
  block?: boolean;
  tokenJwt?: string;
  refreshToken?: string | null;
}

export interface IProfessionalData {
  practiceArea: string[];
  yearsOfExperience: string;
  barCouncilNumber: string;
  stateBarCouncilNumber?: string;
  designation: string;
  courtPracticeArea: string;
  languages: string[];
  aboutMe: string;
  barCouncilCertificate?: string;
  stateBarCouncilCertificate?: string;
  certificate?: ICertification[];
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
