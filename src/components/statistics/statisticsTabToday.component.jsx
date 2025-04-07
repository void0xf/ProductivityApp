"use client";
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
import { getTasksForThatTime, getTasksForToday } from "../../utils/task.utils";
import CustomTooltip from "./customTooltip.component";

const StatisticsTabToday = () => {
  const { state } = useContext(TasksContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const todayTasks = getTasksForToday(state.completedTask);
    const hourlyData = {};

    // Initialize all hours of the day with 0
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0");
      hourlyData[`${hour}:00`] = 0;
    }

    // Count tasks for each hour
    todayTasks.forEach((task) => {
      if (!task.taskDoneDate) return;

      const hour = task.taskDoneDate.getHours().toString().padStart(2, "0");
      const timeKey = `${hour}:00`;
      hourlyData[timeKey] = (hourlyData[timeKey] || 0) + 1;
    });

    // Convert to array format for the chart
    const data = Object.entries(hourlyData).map(([time, count]) => ({
      Time: time,
      TasksDone: count,
    }));

    setChartData(data);
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
          <XAxis dataKey="Time" />
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

export default StatisticsTabToday;
