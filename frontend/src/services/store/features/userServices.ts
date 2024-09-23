import { createAsyncThunk } from "@reduxjs/toolkit";
import userSignData from "../../../utils/type/userType";
import axiosInstance from "../../api/axiosConfigue";
import { USERSIGNUP, VERIFYINGOTP } from "../../api/userApi";
import { AxiosError } from "axios";

export const signUpUser = createAsyncThunk(
  "user/singUpUser",
  async (userData: userSignData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(USERSIGNUP, userData);
      console.log(response.data, "//////////////////////////////////");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue({ error: "Server error" });
        }
      }
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (otp: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(VERIFYINGOTP, otp);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue({ error: "Server error" });
        }
      }
    }
  }
);
