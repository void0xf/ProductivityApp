import { compareDate } from "./date.utils";
import { Task } from "@/redux/slices/tasksSlice";

export const searchForTasks = (tasks: Task[], search: string): Task[] => {
  return tasks.filter((task) =>
    task.taskName.toLowerCase().includes(search.toLowerCase())
  );
};

export const getTasksForToday = (
  tasks: Task[],
  filter: string = "None",
  searchContent: string = ""
): Task[] => {
  const todayDate = new Date();

  const tasksForToday = tasks.filter((task) => {
    const taskDate = task.taskDoneDate || task.date;
    return (
      taskDate &&
      compareDate(taskDate, todayDate) &&
      (filter === "None" || task.list === filter)
    );
  });

  if (searchContent !== "") {
    return searchForTasks(tasksForToday, searchContent);
  }

  return tasksForToday;
};

export const getTasksForTomorrow = (
  tasks: Task[],
  filter: string = "None",
  searchContent: string = ""
): Task[] => {
  const nextDateOfTheWeek = new Date();
  nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + 1);

  const tasksForTomorrow = tasks.filter(
    (task) =>
      compareDate(task.date, nextDateOfTheWeek) &&
      (filter === "None" || task.list === filter)
  );

  if (searchContent !== "") {
    return searchForTasks(tasksForTomorrow, searchContent);
  }

  return tasksForTomorrow;
};

export const getTasksForThisWeek = (
  tasks: Task[],
  filter: string = "None",
  searchContent: string = ""
): Task[] => {
  const tasksForThisWeek: Task[] = [];

  for (let i = 0; i <= 7; i++) {
    const nextDateOfTheWeek = new Date();
    nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + i);

    tasks.forEach((task) => {
      if (
        compareDate(task.date, nextDateOfTheWeek) &&
        (filter === "None" || task.list === filter)
      ) {
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
  tasks: Task[],
  date: Date | undefined,
  filter: string = "None",
  searchContent: string = ""
): Task[] => {
  if (!date) {
    return [];
  }

  const tasksForThatDate = tasks.filter(
    (task) =>
      compareDate(task.date, date) &&
      (filter === "None" || task.list === filter)
  );

  if (searchContent !== "") {
    return searchForTasks(tasksForThatDate, searchContent);
  }

  return tasksForThatDate;
};

export const getTasksForThatTime = (tasks: Task[], time: Date): Task[] => {
  return tasks.filter(
    (task) =>
      task.taskDoneDate?.getHours() === time.getHours() &&
      task.taskDoneDate?.getMinutes() === time.getMinutes()
  );
};

export const getTasksForThisMonth = (
  tasks: Task[],
  filter: string = "None",
  searchContent: string = ""
): Task[] => {
  const tasksForThisMonth: Task[] = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateOfTheMonth = new Date(currentYear, currentMonth, day);

    tasks.forEach((task) => {
      if (
        compareDate(task.date, dateOfTheMonth) &&
        (filter === "None" || task.list === filter)
      ) {
        tasksForThisMonth.push(task);
      }
    });
  }

  if (searchContent !== "") {
    return searchForTasks(tasksForThisMonth, searchContent);
  }

  return tasksForThisMonth;
};

export const getLateTasks = (
  tasks: Task[],
  filter: string = "None",
  searchContent: string = ""
): Task[] => {
  const lateTasks = tasks.filter(
    (task) =>
      task.date < new Date() && (filter === "None" || task.list === filter)
  );

  if (searchContent !== "") {
    return searchForTasks(lateTasks, searchContent);
  }

  return lateTasks;
};

export const getUpcomingTasks = (
  tasks: Task[],
  filter: string = "None",
  searchContent: string = ""
): Task[] => {
  const upcomingTasks = tasks.filter(
    (task) =>
      task.date >= new Date() && (filter === "None" || task.list === filter)
  );

  if (searchContent !== "") {
    return searchForTasks(upcomingTasks, searchContent);
  }

  return upcomingTasks;
};
