import { getTasksForTommorow } from "./task.utils";

export const handleCheckNOD = (tasks) => {
  const tasksForTommorow = getTasksForTommorow(tasks);
  
  if(tasksForTommorow.length > 0) {
    const notification = new Notification('Task For Tommorow', {
      body: `You have ${tasksForTommorow.length} upcoming Task For Tommorow`,
    });
  
  }
}