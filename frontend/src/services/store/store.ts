import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import lawyerSlice from "./features/lawyerSlilce";
import adminSlice from "./features/adminSlice";

export const Store = configureStore({
  reducer: { user: userReducer, lawyer: lawyerSlice, admin: adminSlice },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
