import { createContext, useReducer } from "react";
import { useReducedMotion } from "react-spring";

export const UserContext = createContext();

const INITIAL_STATE = {
  user: null,
  isSettingsCardOpen: false,
  vibrationOnTaskDone: false,
}

const userReducer = (state, action) => {
  switch(action.type){
    case 'TOGGLE_SETTINGS_CARD':
      return {
        ...state,
        isSettingsCardOpen: !state.isSettingsCardOpen,
        user:null
      }
    case 'TOGGLE_VIBRATION':
      return {
        ...state,
        vibrationOnTaskDone: !state.vibrationOnTaskDone  
      }
    default:
      return state
  }
}


export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
  return(
  <UserContext.Provider value={ { state, dispatch }}>
    {children}
  </UserContext.Provider>
  )
}
