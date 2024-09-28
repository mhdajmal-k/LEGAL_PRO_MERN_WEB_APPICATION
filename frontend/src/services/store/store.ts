import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import lawyerSlice from "./features/lawyerSlilce";

export const Store = configureStore({
  reducer: { user: userReducer, lawyer: lawyerSlice },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
