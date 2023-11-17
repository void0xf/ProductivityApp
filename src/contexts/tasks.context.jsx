import { createContext, useReducer, useState, useContext} from "react";

export const TasksContext = createContext();

const initialState = {
  tasks: [],
  isTaskTabOpen: false,
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
      return{
        ...state,
        isTaskTabOpen: !state.isTaskTabOpen
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






