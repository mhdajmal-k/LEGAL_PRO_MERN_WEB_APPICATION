import { createSlice } from "@reduxjs/toolkit";
import UserState from "../../../utils/type/userType";
import { signUpUser, verifyOtp } from "./userServices";

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
        console.log(actions);
        // state.error = actions.payload.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, actions) => {
        state.loading = false;
        console.log(actions);
        // state.error = actions.payload.message;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
