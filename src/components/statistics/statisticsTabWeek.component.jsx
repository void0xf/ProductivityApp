import React, { useContext } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TasksContext } from '../../contexts/tasks.context';
import { getTaskForDate, getTasksForThatDay, getTasksForThisWeek } from '../../utils/task.utils';
import CustomTooltip from './customTooltip.component';

const StatisticsTabWeek = () => {
  const { state } = useContext(TasksContext);
  const weekTasks = getTasksForThisWeek(state.completedTask);
  const chartData = {};

  const options = {
    weekday: 'long'
  }
  
  weekTasks.forEach((task) => {
    const day = task.taskDoneDate;
    const tasksCompletedThatDay = getTaskForDate(state.completedTask, day);
    chartData[day.toLocaleDateString('en-EN', options)] = tasksCompletedThatDay.length;
  });

  const data = Object.entries(chartData).map(([key, value]) => ({
    Day: key,
    TasksDone: value
  }));

  return (
    <div className='flex flex-col'>
      <div className='relative right-6'>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="TasksDone" stroke="#8884d8" />
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
