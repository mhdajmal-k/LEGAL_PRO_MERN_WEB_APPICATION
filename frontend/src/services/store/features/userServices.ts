import { createAsyncThunk } from "@reduxjs/toolkit";
import userSignData, { userLoginData } from "../../../utils/type/userType";
import axiosInstance from "../../api/axiosConfigue";
import { USERLOGIN, USERSIGNUP, VERIFYINGOTP } from "../../api/userApi";
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
      const response = await axiosInstance.post(VERIFYINGOTP, { otp });
      console.log(
        response,
        "is the responcejfffffffffffffffffffffffffffffffffffffff"
      );
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
export const loginUser = createAsyncThunk(
  "user/login",
  async (data: userLoginData, { rejectWithValue }) => {
    try {
      console.log(data, "from the userLogin thunk");
      const response = await axiosInstance.post(USERLOGIN, data);
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
