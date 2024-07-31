import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStatus, TaskPriority } from "@/types";

interface FormData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: Date;
  user: any;
}

interface SheetState {
  formData: FormData;
  isOpen: boolean;
}

const initialState: SheetState = {
  formData: {
    title: "",
    description: "",
    status: TaskStatus.TO_DO,
    priority: TaskPriority.LOW,
    deadline: undefined,
    user: null,
  },
  isOpen: false,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    openSheet(state, action: PayloadAction<{ status?: TaskStatus }>) {
      state.isOpen = true;
      if (action.payload.status) {
        state.formData.status = action.payload.status;
      }
    },
    closeSheet(state) {
      state.isOpen = false;
    },
    updateFormData(state, action: PayloadAction<Partial<FormData>>) {
      state.formData = { ...state.formData, ...action.payload };
    },
    saveSheet(state) {
      fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Task saved successfully:", data);
          state.isOpen = false;
        })
        .catch((error) => {
          console.error("Error saving task:", error);
        });
    },
  },
});

export const { openSheet, closeSheet, updateFormData, saveSheet } =
  sheetSlice.actions;

export default sheetSlice.reducer;
