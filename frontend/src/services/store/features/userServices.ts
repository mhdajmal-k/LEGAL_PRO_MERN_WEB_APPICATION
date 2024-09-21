import { createAsyncThunk } from "@reduxjs/toolkit";
import userSingData from "../../../utils/type/userType";
import axiosInstance from "../../api/axiosConfigue";
import { USERSIGNUP } from "../../api/userApi";
import { AxiosError } from "axios";

export const signUpUser = createAsyncThunk(
  "user/singUpUser",
  async (userData: userSingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(USERSIGNUP, userData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ error: "Server error" });
        }
      }
    }
  }
);
