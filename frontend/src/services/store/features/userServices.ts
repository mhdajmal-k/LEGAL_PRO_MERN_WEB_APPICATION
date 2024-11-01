import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import {
  AISEARCH,
  CHECKREFUNDSTATUS,
  CREATEAPPOINTMENT,
  CREATEPAYMENT,
  FETCHALLAPPOINTMENT,
  FETCHLAWYERBYID,
  FETCHLAWYERS,
  FETCHLAWYERSLOT,
  FETCHONEAPPOINTMENT,
  FORGOTPASSWORD,
  GETAPPOINTMENT,
  GOOGLESIGNUP,
  RESENDOTP,
  RESETFORGOTPASSWORD,
  RESETPASSWORD,
  UPDATEPROFILEDATA,
  USERLOGIN,
  USERLOGOUT,
  USERSIGNUP,
  VERIFYINGOTP,
  VERIFYPAYMENT,
} from "../../api/userApi";
import { AxiosError } from "axios";
import { userLoginData, userSignUp } from "../../../utils/type/userType";
import { response } from "../../../utils/type/lawyerType";

export const signUpUser = createAsyncThunk(
  "user/singUpUser",
  async (userData: userSignUp, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(USERSIGNUP, userData);
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
          errorMessage =
            error.response.data.message ||
            error.response.data ||
            "Server error";
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
      const response = await axiosInstance.get(RESENDOTP);
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
      const response = await axiosInstance.delete(USERLOGOUT);
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
      const response = await axiosInstance.patch(
        `${RESETPASSWORD}/${data.id}`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
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
export const resetForgotPassword = createAsyncThunk(
  "user/resetForgotPassword",
  async (
    data: { password: string; token: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch<response>(
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
  async (
    {
      page,
      limit,
      searchText,
      experience,
      gender,
      languagesSpoken,
      designation,
      courtPracticeArea,
      city,
    }: {
      page: number;
      limit: number;
      searchText?: string;
      experience?: string;
      gender?: string;
      languagesSpoken?: string[];
      designation?: string;
      courtPracticeArea?: string;
      city: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get<response>(FETCHLAWYERS, {
        params: {
          page,
          limit,
          searchText,
          experience,
          gender,
          languagesSpoken: languagesSpoken?.join(","),
          designation,
          courtPracticeArea,
          city,
        },
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
export const getLawyerSlot = createAsyncThunk(
  "user/getLawyerSlot",
  async (lawyerId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${FETCHLAWYERSLOT}/${lawyerId}`
      );
      return response.data;
    } catch (error) {
      let errorMessage = "Network Error.try again later";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage =
            error.response.data.message ||
            error.response.data ||
            "Server error";
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

export const createAppointment = createAsyncThunk(
  "user/createAppointment",
  async (appointmentData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        CREATEAPPOINTMENT,
        appointmentData,
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
          errorMessage = error.response.data.message || error || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const fetchAppointmentDataById = createAsyncThunk(
  "user/fetchAppointmentDataById",
  async (appointmentId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${GETAPPOINTMENT}/${appointmentId}`
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
export const cancelAppointmentDataById = createAsyncThunk(
  "user/cancelAppointmentDataById",
  async (appointmentId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${GETAPPOINTMENT}/${appointmentId}`
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
export const fetchRefundStatus = createAsyncThunk(
  "user/RefundStatus",
  async (appointmentId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${CHECKREFUNDSTATUS}/${appointmentId}`
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

export const fetchAllAppointment = createAsyncThunk(
  "user/fetchAllAppointment",
  async (
    { page, limit, status }: { page: number; limit: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`${FETCHALLAPPOINTMENT}/`, {
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
// export const fetchOneAppointment = createAsyncThunk(
//   "user/fetchOneAppointment",
//   async (appointmentId: string | undefined, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(
//         `${FETCHONEAPPOINTMENT}/${appointmentId}`,
//         {}
//       );
//       return response.data;
//     } catch (error) {
//       let errorMessage = "An unknown error occurred";
//       if (error instanceof AxiosError) {
//         if (error.response) {
//           errorMessage = error.response.data.message || error || "Server error";
//         } else if (error.request) {
//           errorMessage = "Network error. Please check your connection.";
//         }
//       }
//       return rejectWithValue(errorMessage);
//     }
//   }
// );
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
export const createPayment = createAsyncThunk(
  "user/createPayment",
  async (appointmentId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<response>(CREATEPAYMENT, {
        appointmentId,
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
export const verifyPayment = createAsyncThunk(
  "user/verifyPayment",
  async (
    verifyData: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<response>(
        VERIFYPAYMENT,
        verifyData
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
