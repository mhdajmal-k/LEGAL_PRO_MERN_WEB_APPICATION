import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lawyerInfo } from "../../../utils/type/userType";
import { getPendingApprovalLawyers, getUsers } from "./adminServices";

interface adminState {
  adminInfo: lawyerInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: adminState = {
  adminInfo: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.adminInfo = null;
      (state.loading = false), (state.error = "");
    },
    clearError: (state) => {
      (state.error = ""), (state.loading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state) => {
        // state.adminInfo = action.payload;
        state.error = "";
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getPendingApprovalLawyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingApprovalLawyers.fulfilled, (state) => {
        // state.adminInfo = action.payload;
        state.error = "";
        state.loading = false;
      })
      .addCase(
        getPendingApprovalLawyers.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export const { logout, clearError } = adminSlice.actions;
export default adminSlice.reducer;
