import { createContext, useReducer } from "react";

export const StickyWallContext = createContext();

const INITIAL_STATE = {
  StickyNote: []
}

const stickyWallReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_STICKY_NOTE':
      return {
        ...state,
        StickyNote: [...state.StickyNote, action.payload]
      }
      default:
        return state;
  }
}

const StickWallProvider = ({children}) => {
 const [state, dispatch] = useReducer(stickyWallReducer, INITIAL_STATE);

 return (
  <StickyWallContext.Provider value={ {state, dispatch} }>
    {children}
  </StickyWallContext.Provider>
 )
}

export default StickWallProvider