"use client";

import { createContext, useReducer, useContext, ReactNode } from "react";

// Define types
interface Task {
  id: number;
  taskName: string;
  description: string;
  date: Date;
  type: string;
  priority: string;
  list: string;
  taskDoneDate?: Date;
}

interface List {
  name: string;
  icon: string;
}

interface TasksState {
  tasks: Task[];
  isTaskTabOpen: boolean;
  activeTaskId: number;
  lists: List[];
  completedTask: Task[];
}

type TasksAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASKS"; payload: Task[] }
  | { type: "UPDATE_COMPLETED_TASKS"; payload: Task[] }
  | { type: "OPEN_TASK_TAB"; payload: number }
  | { type: "SET_TASK_ID"; payload: number }
  | { type: "REMOVE_TASK_ID"; payload: number }
  | { type: "UPDATE_TASK_ID"; payload: Task }
  | { type: "CLOSE_TASK_TAB" }
  | { type: "ADD_LIST"; payload: string }
  | { type: "UPDATE_LIST"; payload: List[] }
  | { type: "MARK_TASK_AS_DONE"; payload: number }
  | { type: "REMOVE_LIST"; payload: string };

interface TasksContextType {
  state: TasksState;
  dispatch: React.Dispatch<TasksAction>;
}

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);

const initialState: TasksState = {
  tasks: [],
  isTaskTabOpen: false,
  activeTaskId: 0,
  lists: [
    { name: "Personal", icon: "User" },
    { name: "Work", icon: "Briefcase" },
  ],
  completedTask: [],
};

const updateTaskInfo = (tasksElements: Task[], newTaskInfo: Task): Task[] => {
  return tasksElements.map((taskElement) => {
    if (taskElement.id === newTaskInfo.id) {
      return {
        ...taskElement,
        taskName: newTaskInfo.taskName,
        description: newTaskInfo.description,
        date: newTaskInfo.date,
        list: newTaskInfo.list,
      };
    }
    return taskElement;
  });
};

const removeTaskFromTaskList = (
  taskElements: Task[],
  taskid: number
): Task[] => {
  return taskElements.filter((task) => task.id !== taskid);
};

const getTaskFromID = (
  taskElements: Task[],
  taskid: number
): Task | undefined => {
  return taskElements.find((task) => task.id === taskid);
};

const removeTasksWithListName = (tasks: Task[], listname: string): Task[] => {
  return tasks.filter((task) => task.list !== listname);
};

const removeListFromLists = (lists: List[], listName: string): List[] => {
  return lists.filter((list) => list.name !== listName);
};

const taskReducer = (state: TasksState, action: TasksAction): TasksState => {
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
      }
      return {
        ...state,
        isTaskTabOpen: !state.isTaskTabOpen,
      };
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
    case "MARK_TASK_AS_DONE": {
      const completedTask = getTaskFromID(state.tasks, action.payload);
      if (completedTask) {
        completedTask.taskDoneDate = new Date();
        return {
          ...state,
          completedTask: [...state.completedTask, completedTask],
          tasks: removeTaskFromTaskList(state.tasks, action.payload),
        };
      }
      return state;
    }
    case "REMOVE_LIST": {
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
    }
    default:
      return state;
  }
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export function useTaskContext() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
