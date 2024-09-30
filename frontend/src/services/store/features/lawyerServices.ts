import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import { LawyerSignUpData } from "../../../utils/type/userType";
import { LAWYERSIGNUP } from "../../api/lawerApi";
import { AxiosError } from "axios";
import { LawyerSignUpResponse } from "../../../utils/type/lawyerType";

export const signUpLawyer = createAsyncThunk(
  "user/singUpUser",
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
      if (error instanceof AxiosError) {
        console.log(error, "is form the error ");
        if (error.response) {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue("Network error. try again later.");
    }
  }
);
