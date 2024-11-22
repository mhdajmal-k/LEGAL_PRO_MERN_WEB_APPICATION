import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../utils/type/userType";
import {
  AISearch,
  createAppointment,
  fetchLawyer,
  fetchLawyerById,
  googleSignup,
  loginUser,
  // logOut,
  resendOtp,
  signUpUser,
  updateUserProfileData,
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
      .addCase(loginUser.pending, (state) => {
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
      })
      .addCase(googleSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignup.fulfilled, (state, actions) => {
        state.loading = false;
        state.userInfo = actions.payload.result;
      })
      .addCase(googleSignup.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      })
      .addCase(updateUserProfileData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateUserProfileData.fulfilled, (state, actions) => {
        state.error = "";
        state.loading = false;
        state.userInfo = actions.payload.result;
      })
      .addCase(updateUserProfileData.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      })
      .addCase(fetchLawyer.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchLawyer.fulfilled, (state) => {
        state.error = "";
        state.loading = false;
      })
      .addCase(fetchLawyer.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      })
      .addCase(fetchLawyerById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchLawyerById.fulfilled, (state) => {
        state.error = "";
        state.loading = false;
      })
      .addCase(fetchLawyerById.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      })
      .addCase(AISearch.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AISearch.fulfilled, (state) => {
        state.error = "";
        state.loading = false;
      })
      .addCase(AISearch.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.error = "";
        state.loading = false;
      })
      .addCase(createAppointment.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
  },
});

export const { userLogout, clearError } = userSlice.actions;
export default userSlice.reducer;
