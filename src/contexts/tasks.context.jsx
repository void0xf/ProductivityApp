import { createContext, useReducer, useState, useContext} from "react";

export const TasksContext = createContext();

const initialState = {
  tasks: [],
  isTaskTabOpen: false,
  activeTaskId: 0,
};

// const taskInformation = {
//   taskName,
//   description,
//   date,
//   type,
//   tags,
// }

const taskReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TASK':
    return{
      ...state,
      tasks:[...state.tasks, action.payload]
    }
    case 'OPEN_TASK_TAB':
      console.log(action.payload);
      if(action.payload != state.activeTaskId){
        return{
          ...state,
          activeTaskId: action.payload,
          isTaskTabOpen: true
        }
      }
      else{
        return{
          ...state,
          isTaskTabOpen: !state.isTaskTabOpen
        }
      }
      
    case 'SET_TASK_ID':
      return {
        ...state,
        activeTaskId: action.payload
      }
    default:
      return state;
  }

}

export const TaskProvider = ({children}) => {
  const[state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TasksContext.Provider value={ { state, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TasksContext);
}






