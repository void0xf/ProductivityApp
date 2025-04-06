import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TasksContext } from "../../contexts/tasks.context";
import {
  getTaskForDate,
  getTasksForThatDay,
  getTasksForThisWeek,
} from "../../utils/task.utils";
import CustomTooltip from "./customTooltip.component";

const StatisticsTabWeek = () => {
  const { state } = useContext(TasksContext);
  const today = new Date();

  console.log("All completed tasks:", state.completedTask);

  // Get tasks from the last 7 days
  const weekOldTasks = state.completedTask.filter((task) => {
    if (!task.taskDoneDate) return false;

    const taskDate = new Date(task.taskDoneDate);
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    return taskDate >= weekAgo;
  });

  console.log("Week old tasks:", weekOldTasks);

  const [finalchar, setfinalchar] = useState([]);
  const chartData = {};

  useEffect(() => {
    const options = {
      weekday: "long",
    };

    // Initialize the chart data with all days of the week
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      last7Days.push(day);
      chartData[day.toLocaleDateString("en-EN", options)] = 0;
    }

    // Count tasks completed on each day
    weekOldTasks.forEach((task) => {
      if (!task.taskDoneDate) return;

      const day = new Date(task.taskDoneDate);
      const dayString = day.toLocaleDateString("en-EN", options);

      // Increment the count for this day
      chartData[dayString] = (chartData[dayString] || 0) + 1;
    });

    const data = Object.entries(chartData).map(([key, value]) => ({
      Day: key,
      TasksDone: value,
    }));

    console.log("Chart data:", data);
    setfinalchar(data);
  }, [state.completedTask, weekOldTasks]);

  return (
    <div className="flex flex-col">
      <div className="relative right-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={finalchar}>
            <Line type="monotone" dataKey="TasksDone" stroke="#aaaaaa" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="Day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsTabWeek;
