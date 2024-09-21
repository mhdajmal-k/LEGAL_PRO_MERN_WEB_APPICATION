import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

export const Store = configureStore({
  reducer: { userAuth: userReducer },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
