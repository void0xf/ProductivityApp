"use client";

import { createContext, useReducer, useContext } from "react";

export const TasksContext = createContext();

const initialState = {
  tasks: [],
  isTaskTabOpen: false,
  activeTaskId: 0,
  lists: [
    { name: "Personal", icon: "User" },
    { name: "Work", icon: "Briefcase" },
  ],
  completedTask: [],
};

// const taskInformation = {
//   id,
//   taskName,
//   description,
//   date,
//   type,
//   priority,
// }

const updateTaskInfo = (tasksElements, newTaskInfo) => {
  const newTaskElements = tasksElements.map((taskElement) => {
    if (taskElement.id === newTaskInfo.id) {
      return {
        ...taskElement,
        taskName: newTaskInfo.taskName,
        description: newTaskInfo.description,
        date: newTaskInfo.date,
        list: newTaskInfo.list,
      };
    } else {
      return taskElement;
    }
  });
  return newTaskElements;
};

const removeTaskFromTaskList = (taskElements, taskid) => {
  return taskElements.filter((task) => task.id !== taskid);
};

const getTaskFromID = (taskElements, taskid) => {
  return taskElements.filter((task) => task.id === taskid)[0];
};

const removeTasksWithListName = (tasks, listname) => {
  return tasks.filter((task) => task.list !== listname);
};

const removeListFromLists = (lists, listName) => {
  return lists.filter((list) => list.name !== listName);
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "UPDATE_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "UPDATE_COMPLETED_TASKS":
      return {
        ...state,
        completedTask: action.payload,
      };
    case "OPEN_TASK_TAB":
      if (action.payload !== state.activeTaskId) {
        return {
          ...state,
          activeTaskId: action.payload,
          isTaskTabOpen: true,
        };
      } else {
        return {
          ...state,
          isTaskTabOpen: !state.isTaskTabOpen,
        };
      }

    case "SET_TASK_ID":
      return {
        ...state,
        activeTaskId: action.payload,
      };
    case "REMOVE_TASK_ID":
      return {
        ...state,
        tasks: removeTaskFromTaskList(state.tasks, action.payload),
      };
    case "UPDATE_TASK_ID":
      return {
        ...state,
        tasks: updateTaskInfo(state.tasks, action.payload),
      };
    case "CLOSE_TASK_TAB":
      return {
        ...state,
        isTaskTabOpen: false,
      };
    case "ADD_LIST":
      return {
        ...state,
        lists: [...state.lists, { name: action.payload, icon: "User" }],
      };
    case "UPDATE_LIST":
      return {
        ...state,
        lists: action.payload,
      };
    case "MARK_TASK_AS_DONE":
      const completedTask = getTaskFromID(state.tasks, action.payload);
      completedTask["taskDoneDate"] = new Date();
      console.log("Marking task as done:", completedTask);
      console.log("Current completed tasks:", state.completedTask);
      console.log("New completed tasks:", [
        ...state.completedTask,
        completedTask,
      ]);
      return {
        ...state,
        completedTask: [...state.completedTask, completedTask],
        tasks: removeTaskFromTaskList(state.tasks, action.payload),
      };
    case "REMOVE_LIST":
      const listsWithRemovedList = removeListFromLists(
        state.lists,
        action.payload
      );
      const tasksWithoutRemovedList = removeTasksWithListName(
        state.tasks,
        action.payload
      );
      return {
        ...state,
        lists: listsWithRemovedList,
        tasks: tasksWithoutRemovedList,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export function useTaskContext() {
  return useContext(TasksContext);
}
