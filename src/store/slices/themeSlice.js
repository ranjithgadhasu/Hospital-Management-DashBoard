import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("mc-theme");

const initialState = {
  theme: stored === "light" || stored === "dark" ? stored : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("mc-theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
