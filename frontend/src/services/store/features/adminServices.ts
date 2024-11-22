import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import { LoginType, response } from "../../../utils/type/lawyerType";
import { AxiosError } from "axios";
import {
  ADMINLOGOUT,
  BLOCKANDUNBLOCK,
  FETCHAPPOINTMENTDATA,
  FETCHAPPOINTMENTS,
  FETCHASTATICSDATA,
  FETCHLAWYER,
  FETCHLAWYERS,
  FETCHPENDINGAPPROVALLAWYERS,
  FETCHUSER,
  UNVERIFYLAWYER,
  VERIFYLAWYER,
} from "../../api/adminApi";
import { ADMINLOGIN } from "../../api/lawyerApi";

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(FETCHUSER, {
        params: { page, limit },
      });
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

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (data: LoginType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<response>(ADMINLOGIN, data);
      console.log(response, "is the response in service");
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
export const getPendingApprovalLawyers = createAsyncThunk(
  "admin/getPendingApprovalLawyers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<response>(
        FETCHPENDINGAPPROVALLAWYERS
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
export const getLawyer = createAsyncThunk(
  "admin/getLawyer",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<response>(
        `${FETCHLAWYER}/${id}`
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

export const getLawyers = createAsyncThunk(
  "admin/getLawyers",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get<response>(`${FETCHLAWYERS}`, {
        params: { page, limit },
      });
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
1;
export const verifyLawyer = createAsyncThunk(
  "admin/verifyLawyer",
  async (id: string, { rejectWithValue }) => {
    try {
      console.log("hi");
      console.log(id);
      const response = await axiosInstance.patch<response>(
        `${VERIFYLAWYER}/${id}`
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
export const undVerifyLawyer = createAsyncThunk(
  "admin/undVerifyLawyer",
  async (
    { id, reason }: { id: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("hi");
      console.log(id);
      const response = await axiosInstance.patch<response>(
        `${UNVERIFYLAWYER}/${id}`,
        { reason }
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
export const blockandUnblock = createAsyncThunk(
  "admin/blockandUnblock",
  async (
    { id, state, action }: { id: string; state: boolean; action: string },
    { rejectWithValue }
  ) => {
    try {
      console.log(state, "is the state");
      const response = await axiosInstance.patch<response>(
        `${BLOCKANDUNBLOCK}/${id}`,
        { state, action }
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
export const fetchAllAppointmentAdminSide = createAsyncThunk(
  "admin/fetchAllAppointment",
  async (
    { page, limit, status }: { page: number; limit: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`${FETCHAPPOINTMENTS}/`, {
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
export const adminFetchAppointmentDataById = createAsyncThunk(
  "admin/adminFetchAppointmentDataById",
  async (appointmentId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${FETCHAPPOINTMENTDATA}/${appointmentId}`
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
export const getStaticData = createAsyncThunk(
  "admin/getStaticData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${FETCHASTATICSDATA}`);
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
export const adminLogOut = createAsyncThunk(
  "user/adminLogOut",
  async (_, { rejectWithValue }) => {
    try {
      console.log("hi");
      const response = await axiosInstance.delete<response>(ADMINLOGOUT);
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
