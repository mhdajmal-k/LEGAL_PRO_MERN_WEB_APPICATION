import { createSlice } from "@reduxjs/toolkit";
import UserState from "../../../utils/type/userType";

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
  // extraReducers: (builder) => {
  //   builder.addCase(singUpUser.pending, (state, action) = {});
  // },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
