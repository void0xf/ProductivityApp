import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  // Add user properties here when needed
  [key: string]: any;
}

interface UserState {
  user: User | null;
  isSettingsCardOpen: boolean;
  vibrationOnTaskDone: boolean;
  NOD: boolean;
  darkMode: boolean;
}

const initialState: UserState = {
  user: null,
  isSettingsCardOpen: false,
  vibrationOnTaskDone: false,
  NOD: false,
  darkMode: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSettingsCard: (state) => {
      state.isSettingsCardOpen = !state.isSettingsCardOpen;
      state.user = null;
    },
    toggleVibration: (state) => {
      state.vibrationOnTaskDone = !state.vibrationOnTaskDone;
    },
    toggleNOD: (state) => {
      state.NOD = !state.NOD;
    },
    turnOffNOD: (state) => {
      state.NOD = false;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Export actions
export const {
  toggleSettingsCard,
  toggleVibration,
  toggleNOD,
  turnOffNOD,
  toggleDarkMode,
  setUser,
} = userSlice.actions;

// Export selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectIsSettingsCardOpen = (state: RootState) =>
  state.user.isSettingsCardOpen;
export const selectVibrationOnTaskDone = (state: RootState) =>
  state.user.vibrationOnTaskDone;
export const selectNOD = (state: RootState) => state.user.NOD;
export const selectDarkMode = (state: RootState) => state.user.darkMode;

export default userSlice.reducer;
