import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "@/data/mockData";

export const DEMO_CREDENTIALS = {
  email: "admin@medicare.com",
  password: "admin123",
};

const storedUser = localStorage.getItem("mc-user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("mc-user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("mc-user");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("mc-user", JSON.stringify(action.payload));
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
