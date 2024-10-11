import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lawyerVerifyOtp, loginLawyer, signUpLawyer } from "./lawyerServices";
import { LawyerInfo } from "../../../utils/type/lawyerType";

interface lawyerState {
  lawyerInfo: LawyerInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: lawyerState = {
  lawyerInfo: null,
  error: null,
  loading: false,
};

const lawyerSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.lawyerInfo = null;
      state.error = "";
    },
    clearError: (state) => {
      (state.error = ""), (state.loading = false);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signUpLawyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpLawyer.fulfilled, (state, actions: PayloadAction<any>) => {
        state.lawyerInfo = actions.payload.result;
        state.loading = false;
      })
      .addCase(signUpLawyer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(lawyerVerifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        lawyerVerifyOtp.fulfilled,
        (state, actions: PayloadAction<any>) => {
          state.lawyerInfo = actions.payload.result;
          state.lawyerInfo = actions.payload;
          state.loading = false;
        }
      )
      .addCase(
        lawyerVerifyOtp.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(loginLawyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginLawyer.fulfilled, (state, actions: PayloadAction<any>) => {
        state.lawyerInfo = actions.payload.result;
        state.loading = false;
      })
      .addCase(loginLawyer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = lawyerSlice.actions;
export default lawyerSlice.reducer;
