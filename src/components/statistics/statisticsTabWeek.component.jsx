import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TasksContext } from "../../contexts/tasks.context";
import CustomTooltip from "./customTooltip.component";

const StatisticsTabWeek = () => {
  const { state } = useContext(TasksContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of day
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 6);
    weekAgo.setHours(0, 0, 0, 0); // Set to start of day

    // Filter tasks for the last 7 days
    const weekTasks = state.completedTask.filter((task) => {
      if (!task.taskDoneDate) return false;
      const taskDate = new Date(task.taskDoneDate);
      return taskDate >= weekAgo && taskDate <= today;
    });

    // Create an array of dates for the last 7 days
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0); // Set to start of day
      dates.push(date);
    }
    dates.reverse(); // Sort from oldest to newest

    // Initialize data array with all days
    const data = dates.map((date) => {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      return {
        name: dayName,
        TasksDone: 0,
        date: date, // Store the actual date for comparison
      };
    });

    // Count tasks for each day
    weekTasks.forEach((task) => {
      if (!task.taskDoneDate) return;
      const taskDate = new Date(task.taskDoneDate);
      taskDate.setHours(0, 0, 0, 0); // Set to start of day for comparison

      // Find the matching day in our data array
      const dayIndex = data.findIndex((day) => {
        return day.date.getTime() === taskDate.getTime();
      });

      if (dayIndex !== -1) {
        data[dayIndex].TasksDone += 1;
      }
    });

    // Remove the date property before setting the state
    const finalData = data.map(({ name, TasksDone }) => ({ name, TasksDone }));
    setChartData(finalData);
  }, [state.completedTask]);

  return (
    <div className="w-full h-[400px] px-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="TasksDone"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsTabWeek;
