import authReducer from "@/redux/slice/authSlice";
import modalReducer from "@/redux/slice/modalSlice";
import strategiesReducer from "@/redux/slice/strategiesSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  strategies: strategiesReducer,
});
export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: { trace: true, traceLimit: 25 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
