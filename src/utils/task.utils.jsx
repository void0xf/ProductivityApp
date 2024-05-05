import React, { useContext } from "react";
import { TasksContext, useTaskContext } from "../contexts/tasks.context";
import { compareDate } from "./date.utils";
import {
  getCompletedTasksByUID,
  getListsByUID,
  getNotesbyUID,
  getTasksByUID,
} from "../firebase/firestore";

export const searchForTasks = (tasks, search) => {
  const results = [];
  tasks.filter((task) => {
    if (task.taskName.toLowerCase().includes(search.toLowerCase())) {
      results.push(task);
    }
  });
  return results;
};

export const getTasksForToday = (
  tasks,
  filter = "None",
  searchContent = ""
) => {
  const tasksForToday = [];
  const todayDate = new Date();
  tasks.map((task) => {
    if (compareDate(task.date, todayDate) && task.list == filter) {
      tasksForToday.push(task);
    }
  });

  if (searchContent !== "") {
    return searchForTasks(tasksForToday, searchContent);
  }

  return tasksForToday;
};

export const getTasksForTommorow = (
  tasks,
  filter = "None",
  searchContent = ""
) => {
  const tasksForTommorow = [];
  const nextDateOfTheWeek = new Date();
  nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + 1);
  tasks.map((task) => {
    if (compareDate(task.date, nextDateOfTheWeek) && task.list == filter) {
      tasksForTommorow.push(task);
    }
  });

  if (searchContent !== "") {
    return searchForTasks(tasksForTommorow, searchContent);
  }

  return tasksForTommorow;
};

export const getTasksForThisWeek = (
  tasks,
  filter = "None",
  searchContent = ""
) => {
  const tasksForThisWeek = [];
  for (let i = 0; i <= 7; i++) {
    const nextDateOfTheWeek = new Date();
    nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + i);

    tasks.map((task) => {
      if (compareDate(task.date, nextDateOfTheWeek) && task.list == filter) {
        tasksForThisWeek.push(task);
      }
    });
  }
  if (searchContent !== "") {
    return searchForTasks(tasksForThisWeek, searchContent);
  }

  return tasksForThisWeek;
};

export const getTaskForDate = (
  tasks,
  date,
  filter = "None",
  searchContent = ""
) => {
  if (date === undefined) {
    return [];
  }

  const tasksForThatDate = [];
  tasks.map((task) => {
    if (compareDate(task.date, date) && task.list == filter) {
      tasksForThatDate.push(task);
    }
  });

  if (searchContent !== "") {
    return searchForTasks(tasksForThatDate, searchContent);
  }

  return tasksForThatDate;
};

export const getTasksForThatTime = (tasks, time) => {
  const tasksForThatHour = [];
  tasks.map((task) => {
    if (
      task.taskDoneDate.getHours() === time.getHours() &&
      task.taskDoneDate.getMinutes() === time.getMinutes()
    ) {
      tasksForThatHour.push(task);
    }
  });
  return tasksForThatHour;
};

export const getTasksForThisMonth = (
  tasks,
  filter = "None",
  searchContent = ""
) => {
  const tasksForThisMonth = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateOfTheMonth = new Date(currentYear, currentMonth, day);

    tasks.forEach((task) => {
      if (compareDate(task.date, dateOfTheMonth) && task.list === filter) {
        tasksForThisMonth.push(task);
      }
    });
  }

  if (searchContent !== "") {
    return searchForTasks(tasksForThisMonth, searchContent);
  }

  return tasksForThisMonth;
};

export const getLateTasks = (tasks, filter = "None", searchContent = "") => {
  const lateTasks = [];

  tasks.forEach((task) => {
    if (task.date < new Date() && task.list == filter) {
      lateTasks.push(task);
    }
  });

  if (searchContent !== "") {
    return searchForTasks(lateTasks, searchContent);
  }

  return lateTasks;
};

export const getUpcomingTasks = (
  tasks,
  filter = "None",
  searchContent = ""
) => {
  const upcomingTasks = [];

  tasks.forEach((task) => {
    if (task.date >= new Date() && task.list == filter) {
      upcomingTasks.push(task);
    }
  });

  if (searchContent !== "") {
    return searchForTasks(upcomingTasks, searchContent);
  }

  return upcomingTasks;
};

export const synchonizeTasks = async (firestore, uid, dispatch) => {
  try {
    const tasks = await getTasksByUID(firestore, uid);
    if (tasks) {
      await dispatch({ type: "UPDATE_TASKS", payload: tasks });
      return "Success";
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return error;
  }
};

export const synchonizeCompletedTasks = async (firestore, uid, dispatch) => {
  try {
    const tasks = await getCompletedTasksByUID(firestore, uid);
    await dispatch({
      type: "UPDATE_COMPLETED_TASKS",
      payload: tasks ? tasks : [],
    });
    return "Success";
  } catch (error) {
    console.error("Error fetching Completed tasks:", error);
    return error;
  }
};

export const synchonizeNotes = async (firestore, uid, dispatch) => {
  try {
    const notes = await getNotesbyUID(firestore, uid);
    if (notes) {
      await dispatch({ type: "UPDATE_NOTES", payload: notes });
      return "Success";
    } else {
      dispatch({ type: "UPDATE_NOTES", payload: [] });
      return "Success";
    }
  } catch (error) {
    console.error("Error fetching Notes:", error);
    return error;
  }
};
export const synchronizeLists = async (firestore, uid, dispatch) => {
  try {
    const listsFromDB = await getListsByUID(firestore, uid);
    if (listsFromDB) {
      if (listsFromDB.length > 0) {
        await dispatch({ type: "UPDATE_LIST", payload: listsFromDB });
      }
      return "Success";
    } else {
      await dispatch({ type: "UPDATE_LIST", payload: [] });
      return "Success";
    }
  } catch (error) {
    console.error("Error fetching Lists:", error);
    return error;
  }
};
