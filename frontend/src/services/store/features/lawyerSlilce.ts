import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpLawyer } from "./lawyerServices";
import { lawyerInfo } from "../../../utils/type/userType";

interface lawyerState {
  lawyerInfo: lawyerInfo | null;
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
      .addCase(signUpLawyer.fulfilled, (state, action: PayloadAction<any>) => {
        state.lawyerInfo = action.payload;
        state.loading = false;
      })
      .addCase(signUpLawyer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = lawyerSlice.actions;
export default lawyerSlice.reducer;
