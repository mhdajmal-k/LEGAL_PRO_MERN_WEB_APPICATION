import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  adminLogin,
  getPendingApprovalLawyers,
  getUsers,
} from "./adminServices";

interface adminState {
  adminInfo: any | null;
  loading: boolean;
  error: string | null;
  authenticate: boolean;
}

const initialState: adminState = {
  adminInfo: null,
  error: null,
  loading: false,
  authenticate: true,
};

const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogout: (state) => {
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
        // state.adminInfo = actions.payload.result;
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
      )
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, actions) => {
        console.log(
          actions.payload.result,
          "is the result in the extra reducer"
        );
        state.adminInfo = actions.payload.result;
        state.error = "";
        state.loading = false;
        // state.authenticate = actions.payload.status;
      })
      .addCase(adminLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { adminLogout, clearError } = adminSlice.actions;
export default adminSlice.reducer;
