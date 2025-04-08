import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "@/types/ui.types";

const initialState: UIState = {
  isSideBarActive: true,
  theme: "light",
};

const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarActive = !state.isSideBarActive;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSideBar, setTheme } = uiStateSlice.actions;

export default uiStateSlice.reducer;
