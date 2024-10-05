import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import {
  LawyerSignUpResponse,
  LoginType,
  response,
} from "../../../utils/type/lawyerType";
import { AxiosError } from "axios";
import { FETCHPENDINGAPPROVALLAWYERS, FETCHUSER } from "../../api/adminApi";
import { ADMINLOGIN } from "../../api/lawyerApi";

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<LawyerSignUpResponse>(FETCHUSER);
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
      console.log(response, "//////////////////////////////////");
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
