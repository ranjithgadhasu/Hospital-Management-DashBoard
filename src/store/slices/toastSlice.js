import { createSlice } from "@reduxjs/toolkit";

let counter = 0;

const toastSlice = createSlice({
  name: "toast",
  initialState: { toasts: [] },
  reducers: {
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

// Thunk: shows a toast then auto-dismisses it after 4 seconds
export const showToast = (type, title, message) => (dispatch) => {
  const id = `toast-${Date.now()}-${counter++}`;
  dispatch(addToast({ id, type, title, message }));
  setTimeout(() => dispatch(removeToast(id)), 4000);
};

export default toastSlice.reducer;
