"use client";

import { createContext, useReducer, ReactNode } from "react";

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

type UserAction =
  | { type: "TOGGLE_SETTINGS_CARD" }
  | { type: "TOGGLE_VIBRATION" }
  | { type: "TOGGLE_NOD" }
  | { type: "TOGGLE_NOD_OFF" }
  | { type: "TOGGLE_DARKMODE" };

interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const INITIAL_STATE: UserState = {
  user: null,
  isSettingsCardOpen: false,
  vibrationOnTaskDone: false,
  NOD: false,
  darkMode: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "TOGGLE_SETTINGS_CARD":
      return {
        ...state,
        isSettingsCardOpen: !state.isSettingsCardOpen,
        user: null,
      };
    case "TOGGLE_VIBRATION":
      return {
        ...state,
        vibrationOnTaskDone: !state.vibrationOnTaskDone,
      };
    case "TOGGLE_NOD":
      return {
        ...state,
        NOD: !state.NOD,
      };
    case "TOGGLE_NOD_OFF":
      return {
        ...state,
        NOD: false,
      };
    case "TOGGLE_DARKMODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
