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

const StatisticsTabMonth = () => {
  const { state } = useContext(TasksContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of day
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0); // Set to start of day

    const monthTasks = state.completedTask.filter((task) => {
      if (!task.taskDoneDate) return false;
      const taskDate = new Date(task.taskDoneDate);
      return taskDate >= firstDayOfMonth && taskDate <= today;
    });

    // Create an array of dates for the current month
    const dates = [];
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      date.setHours(0, 0, 0, 0);
      dates.push(date);
    }

    // Initialize data array with all days
    const data = dates.map((date) => ({
      day: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      TasksDone: 0,
      date: date, // Store the actual date for comparison
    }));

    // Count tasks for each day
    monthTasks.forEach((task) => {
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
    const finalData = data.map(({ day, TasksDone }) => ({ day, TasksDone }));
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
          <XAxis dataKey="day" angle={-45} textAnchor="end" height={60} />
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

export default StatisticsTabMonth;
