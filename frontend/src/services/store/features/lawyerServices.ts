import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import { LawyerSignUpData } from "../../../utils/type/userType";
import {
  CANCELLAPPOINTMENTLAWYER,
  FETCHALLAPPOINTMENTS,
  FETCHAPPOINTMENTLAWYER,
  FETCHLAWYERSLOT,
  FETCHONEBLOG,
  LAWYERCREATEBLOG,
  LAWYERCREATESLOT,
  LAWYERFORGOTPASSWORD,
  LAWYERLOGIN,
  LAWYERLOGOUT,
  LAWYERRESENDOTP,
  LAWYERRESETFORGOTPASSWORD,
  LAWYERSIGNUP,
  LAWYERUPDATESLOT,
  LAWYERVERIFYINGOTP,
  LAWYERVERIFYPROFESSIONALDATA,
  UPDATEPROFESSIONALDATA,
} from "../../api/lawerApi";
import { AxiosError } from "axios";
import { LawyerSignUpResponse, response } from "../../../utils/type/lawyerType";

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
    try {
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
export const updateProfessionalData = createAsyncThunk(
  "lawyer/updateProfessionalData",
  async (ProfessionalData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        UPDATEPROFESSIONALDATA,
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

export const loginLawyer = createAsyncThunk(
  "lawyer/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(LAWYERLOGIN, data);
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
export const lawyerForgotpassword = createAsyncThunk(
  "lawyer/lawyerForgotpassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(LAWYERFORGOTPASSWORD, {
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
export const lawyerResetForgotPassword = createAsyncThunk(
  "lawyer/resetForgotPassword",
  async (
    data: { password: string; token: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<response>(
        `${LAWYERRESETFORGOTPASSWORD}/${data.token}`,
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

export const createSlot = createAsyncThunk(
  "lawyer/createSlot",
  async (
    data: {
      id: string | undefined;
      date: Date | string;
      time: { timeSlot: string; fee: number }[];
      feeAmount: number;
      slotId: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<response>(
        LAWYERCREATESLOT,
        data
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
export const fetchLawyerSlots = createAsyncThunk(
  "lawyer/fetchLawyerSlots",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<response>(
        `${FETCHLAWYERSLOT}/${id}`
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
export const updateSlot = createAsyncThunk(
  "lawyer/updateSlot",
  async (
    data: {
      id: string | undefined;
      date: Date | string;
      time: { timeSlot: string; fee: number }[];
      feeAmount: number;
      slotId: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put<response>(
        `${LAWYERUPDATESLOT}/${data.slotId}`,
        data
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
export const deleteSlot = createAsyncThunk(
  "lawyer/deleteSlot",
  async (slotId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<response>(
        `${LAWYERUPDATESLOT}/${slotId}`
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

export const fetchAllAppointmentLawyerSide = createAsyncThunk(
  "lawyer/fetchAllAppointment",
  async (
    { page, limit, status }: { page: number; limit: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`${FETCHALLAPPOINTMENTS}/`, {
        params: {
          page: page,
          limit: limit,
          status: status,
        },
      });
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || error || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const LawyerFetchAppointmentDataById = createAsyncThunk(
  "lawyer/LawyerFetchAppointmentDataById",
  async (appointmentId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${FETCHAPPOINTMENTLAWYER}/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || error || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const LawyerCancelAppointmentDataById = createAsyncThunk(
  "lawyer/LawyerCancelAppointmentDataById",
  async (appointmentId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${CANCELLAPPOINTMENTLAWYER}/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || error || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const crateBlog = createAsyncThunk(
  "lawyer/crateBlog",
  async (blogData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(LAWYERCREATEBLOG, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
export const fetchLawyerBlogs = createAsyncThunk(
  "lawyer/fetchLawyerBlogs",
  async (
    { currentPage, limit }: { currentPage: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(LAWYERCREATEBLOG, {
        params: {
          currentPage,
          limit,
        },
      });

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
export const fetchOneBlog = createAsyncThunk(
  "lawyer/fetchOneBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${FETCHONEBLOG}/${id}`);

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

export const lawyerLogOut = createAsyncThunk(
  "user/lawyerLogOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<response>(LAWYERLOGOUT);
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
