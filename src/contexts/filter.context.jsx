"use client";

import { createContext, useContext, useReducer } from "react";
import { useTaskContext } from "./tasks.context";

export const TaskFilter = createContext();

const INITIAL_STATE = {
  filter: "Upcoming",
  listFilter: "None",
  tagsFilter: [],
};

export const filtrTasks = (tasks, filter) => {
  const taskList = tasks.tasks;
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const currentDate = `${year}-${month}-${day}`;
  if (
    filter.filter == "" ||
    filter.listFilter == "" ||
    filter.tagsFilter.length == 0
  ) {
    return;
  }

  // return taskList.map((task) => {
  //   if(filter.filter == 'Today') {
  //     taskList = taskList.map((task) => {
  //       if(task.date == currentDate) {
  //         return task
  //       }
  //     })
  //   }
  //   if(filter.listFilter.length)
  //   {
  //     taskList = taskList.map((task) => {
  //       if(task.list == filter.listFilter)
  //         return task
  //     })
  //   }
  // })
};

const filterReducer = (state, action) => {
  const { type, payload } = action;
  const { filter, listFilter, tagsFilter } = state;

  switch (type) {
    case "UPDATE_FILTER":
      return {
        filter: payload.filter,
        listFilter: state.listFilter,
        tagsFilter: [...tagsFilter],
      };
    case "UPDATE_FILTER_LIST":
      return {
        filter: state.filter,
        listFilter: payload.listFilter,
        tagsFilter: [...tagsFilter],
      };
    case "UPDATE_TAGS":
      return {
        filter: state.filter,
        listFilter: state.listFilter,
        tagsFilter: [...tagsFilter, payload.tagsFilter],
      };

    default:
      return state;
  }
};
export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, INITIAL_STATE);

  return (
    <TaskFilter.Provider value={{ state, dispatch }}>
      {children}
    </TaskFilter.Provider>
  );
};

export function useFilterContext() {
  return useContext(TaskFilter);
}
