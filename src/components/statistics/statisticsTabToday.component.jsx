import React, { useContext } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TasksContext } from '../../contexts/tasks.context';
import { getTasksForThatTime, getTasksForToday } from '../../utils/task.utils';
import CustomTooltip from './customTooltip.component';

const StatisticsTabToday = () => {
  const { state } = useContext(TasksContext);
  const todayTasks = getTasksForToday(state.completedTask);
  const chartData = {};

  todayTasks.forEach((task) => {
    const tasksCompletedInThatTime = getTasksForThatTime(todayTasks, task.taskDoneDate);
    chartData[`${task.taskDoneDate.toLocaleTimeString('PL-pl', {hour: '2-digit', minute: '2-digit'})}`] = tasksCompletedInThatTime.length;
  });

  const data = Object.entries(chartData).map(([key, value]) => ({
    Time: key,
    TasksDone: value
  }));


  return (
    <div className='flex flex-col'>
      <div className='relative right-6'>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
        <Line type="monotone" dataKey="TasksDone" stroke="#aaaaaa" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="Time" />
          <YAxis tickCount={1} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
      </div>
      <div className='flex justify-center items-center text-center'>
      </div>
    </div>
  );
};

export default StatisticsTabToday;
