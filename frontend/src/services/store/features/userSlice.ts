import { createSlice } from "@reduxjs/toolkit";
import UserState from "../../../utils/type/userType";
import { loginUser, signUpUser, verifyOtp } from "./userServices";

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.loading = false), (state.userInfo = null), (state.error = "");
    },
    clearError: (state) => {
      (state.error = ""), (state.loading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
        // state.error = actions.payload.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, actions) => {
        state.userInfo = actions.payload.result;
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
        // state.error = actions.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        // state.userInfo = actions.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
        // state.error = actions.payload.message;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
