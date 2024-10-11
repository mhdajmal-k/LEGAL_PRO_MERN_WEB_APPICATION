import { createAsyncThunk } from "@reduxjs/toolkit";
// import {userSignData,userLoginData } from "../../../utils/type/userType";
import axiosInstance from "../../api/axiosConfigue";
import {
  FORGOTPASSWORD,
  GOOGLESIGNUP,
  RESENDOTP,
  RESETFORGOTPASSWORD,
  USERLOGIN,
  USERLOGOUT,
  USERSIGNUP,
  VERIFYINGOTP,
} from "../../api/userApi";
import { AxiosError } from "axios";
import { userLoginData, userSignUp } from "../../../utils/type/userType";
import { response } from "../../../utils/type/lawyerType";

export const signUpUser = createAsyncThunk(
  "user/singUpUser",
  async (userData: userSignUp, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(USERSIGNUP, userData);
      console.log(response.data, "//////////////////////////////////");
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
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
      let errorMessage = "Network error. try again later.";
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
export const loginUser = createAsyncThunk(
  "user/login",
  async (data: userLoginData, { rejectWithValue }) => {
    try {
      console.log(data, "from the userLogin thunk");
      const response = await axiosInstance.post(USERLOGIN, data);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
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
export const googleSignup = createAsyncThunk(
  "user/googleSignup",
  async (
    data: { email: string | null; userName: string | null },
    { rejectWithValue }
  ) => {
    try {
      console.log(data, "from the userLogin thunk");
      const response = await axiosInstance.post(GOOGLESIGNUP, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
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

export const resendOtp = createAsyncThunk(
  "user/resenedOtp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(RESENDOTP);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
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
export const logOut = createAsyncThunk(
  "user/logOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(USERLOGOUT);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
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
export const forgotpassword = createAsyncThunk(
  "user/forgotpassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<response>(FORGOTPASSWORD, {
        email,
      });

      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
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
export const resetForgotPassword = createAsyncThunk(
  "user/resetForgotPassword",
  async (
    data: { password: string; token: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post<response>(
        `${RESETFORGOTPASSWORD}/${data.token}`,
        {
          password: data.password,
        }
      );

      console.log("hi");
      const resp = await axiosInstance.post(USERLOGOUT);
      console.log(resp, "this is the response");
      return resp.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
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
