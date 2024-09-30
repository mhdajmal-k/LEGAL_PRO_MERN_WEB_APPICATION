// src/framework/database/models/userModel.ts
import mongoose, { Schema, model } from "mongoose";
import { ILawyer } from "../../../domain/entites/imodels/iLawyer";

// Define the User schema
type ILawyerType = ILawyer & mongoose.Document;
const lawyerSchema = new Schema<ILawyerType>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
    gender: { type: String },
    years_of_experience: { type: String },
    languages_spoken: { type: [String], required: true },
    designation: String,
    about: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    verified: { type: Boolean, default: false },
    practice_area: { type: [String], required: true },
    block: { type: Boolean, default: false },
    certifications: [
      {
        certificateType: { type: String },
        enrolmentNumber: { type: String },
        certificate: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Lawyer = model<ILawyerType>("Lawyer", lawyerSchema);
export default Lawyer;
