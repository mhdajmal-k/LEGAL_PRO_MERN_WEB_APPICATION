import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import { LawyerSignUpData } from "../../../utils/type/userType";
import {
  LAWYERRESENDOTP,
  LAWYERSIGNUP,
  LAWYERVERIFYINGOTP,
  LAWYERVERIFYPROFESSIONALDATA,
} from "../../api/lawerApi";
import { AxiosError } from "axios";
import { LawyerSignUpResponse } from "../../../utils/type/lawyerType";

export const signUpLawyer = createAsyncThunk(
  "lawyer/singUpUser",
  async (LawyerData: LawyerSignUpData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<LawyerSignUpResponse>(
        LAWYERSIGNUP,
        LawyerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data, "//////////////////////////////////");
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const lawyerVerifyOtp = createAsyncThunk(
  "lawyer/verifyOtp",
  async (otp: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(LAWYERVERIFYINGOTP, { otp });
      console.log(
        response,
        "is the responcejfffffffffffffffffffffffffffffffffffffff"
      );
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const lawyerResendOtp = createAsyncThunk(
  "lawyer/resenedOtp",
  async (_, { rejectWithValue }) => {
    try {
      console.log("hi");
      const response = await axiosInstance.post(LAWYERRESENDOTP);
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyProfessionalData = createAsyncThunk(
  "lawyer/verifyProfessionalData",
  async (ProfessionalData: FormData, { rejectWithValue }) => {
    console.log(ProfessionalData, "is the lawyerdata from the service");
    try {
      console.log("hi");
      const response = await axiosInstance.post(
        LAWYERVERIFYPROFESSIONALDATA,
        ProfessionalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
