import { Task } from "@/redux/slices/tasksSlice";
import { getTasksForTomorrow } from "./task.utils";

export const handleCheckNOD = (tasks: Task[]): void => {
  const tasksForTomorrow = getTasksForTomorrow(tasks);

  if (tasksForTomorrow.length > 0) {
    new Notification("Task For Tomorrow", {
      body: `You have ${tasksForTomorrow.length} upcoming Task For Tomorrow`,
    });
  }
};
