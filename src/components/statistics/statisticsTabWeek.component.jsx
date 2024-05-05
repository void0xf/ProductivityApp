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
  const weekOldTasks = state.completedTask.filter(
    (task) =>
      task.taskDoneDate >=
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  );

  const [finalchar, setfinalchar] = useState();
  const chartData = {};

  useEffect(() => {
    const options = {
      weekday: "long",
    };

    weekOldTasks.forEach((task) => {
      const day = task.taskDoneDate;
      const tasksCompletedThatDay = getTaskForDate(state.completedTask, day);
      chartData[day.toLocaleDateString("en-EN", options)] =
        tasksCompletedThatDay.length;
    });

    const data = Object.entries(chartData).map(([key, value]) => ({
      Day: key,
      TasksDone: value,
    }));

    setfinalchar(data);
  }, [state.completedTask]);

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
