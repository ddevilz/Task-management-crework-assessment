import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isAddTaskModalOpen: boolean;
}

const initialState: UIState = {
  isAddTaskModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAddTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskModalOpen = action.payload;
    },
  },
});

export const { setAddTaskModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
