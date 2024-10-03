import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfigue";
import { LawyerSignUpResponse } from "../../../utils/type/lawyerType";
import { AxiosError } from "axios";
import { FETCHUSER } from "../../api/adminApi";

export const getUsers = createAsyncThunk(
  "lawyer/singUpUser",
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
