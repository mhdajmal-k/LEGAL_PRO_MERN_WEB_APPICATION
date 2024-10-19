import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import {
  AISEARCH,
  FETCHLAWYERBYID,
  FETCHLAWYERS,
  FORGOTPASSWORD,
  GOOGLESIGNUP,
  RESENDOTP,
  RESETFORGOTPASSWORD,
  RESETPASSWORD,
  UPDATEPROFILEDATA,
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

export const updateUserProfileData = createAsyncThunk(
  "user/updateUserProfileData",
  async (
    { profileData, id }: { profileData: FormData; id: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `${UPDATEPROFILEDATA}/${id}`,
        profileData,
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
        console.log(error);
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
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    data: {
      currentPassword: string;
      newPassword: string | null;
      id: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`${RESETPASSWORD}/${data.id}`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        console.log(error);
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
      const response = await axiosInstance.post<response>(
        `${RESETFORGOTPASSWORD}/${data.token}`,
        {
          password: data.password,
        }
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
export const fetchLawyer = createAsyncThunk(
  "user/fetchLawyer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<response>(FETCHLAWYERS);

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
export const AISearch = createAsyncThunk(
  "user/AISearch",
  async (prompt: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<response>(AISEARCH, { prompt });
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
export const fetchLawyerById = createAsyncThunk(
  "user/fetchLawyerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<response>(
        `${FETCHLAWYERBYID}/${id}`
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
