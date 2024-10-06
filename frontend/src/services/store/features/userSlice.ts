import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../utils/type/userType";
import {
  loginUser,
  logOut,
  resendOtp,
  signUpUser,
  verifyOtp,
} from "./userServices";

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLogout: (state) => {
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
      })
      .addCase(loginUser.pending, (state, actions) => {
        state.userInfo = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, actions) => {
        state.userInfo = actions.payload.result;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    // .addCase(logOutUser.pending, (state, action) => {
    //   state.loading = true;
    // })
    // .addCase(logOutUser.rejected, (state, actions) => {
    //   state.loading = false;
    //   state.error = actions.payload as string;
    // })
    // .addCase(logOutUser.fulfilled, (state, actions) => {
    //   (state.loading = false), (state.userInfo = null), (state.error = "");
    // });
  },
});

export const { userLogout, clearError } = userSlice.actions;
export default userSlice.reducer;
