import { configureStore } from "@reduxjs/toolkit";
import sheetReducer from "../features/sheet/sheetSlice";
import uiReducer from "../features/ui/uiSlice";

const store = configureStore({
  reducer: {
    sheet: sheetReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
