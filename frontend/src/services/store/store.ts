import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import lawyerSlice from "./features/lawyerSlilce";
import adminSlice from "./features/adminSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  lawyer: lawyerSlice,
  admin: adminSlice,
});

const persistConfig = {
  //name of the localStorage
  key: "root",
  version: 1,
  //we can use session storage also
  storage,
  //excluding admin
  // blacklist: ['admin']
};
const persisterReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persisterReducer,
});

export const persistor = persistStore(Store);
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
