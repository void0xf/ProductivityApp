import React, { useContext } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TasksContext } from '../../contexts/tasks.context';
import { getTaskForDate, getTasksForThisMonth } from '../../utils/task.utils';

const StatisticsTabMonth = () => {
  const { state } = useContext(TasksContext);
  const monthTasks = getTasksForThisMonth(state.completedTask);
  const chartData = {};
  console.log(state)
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  
  monthTasks.forEach((task) => {
    const day = task.taskDoneDate;
    const tasksCompletedThatDay = getTaskForDate(monthTasks, day);
    chartData[day.toLocaleDateString('EN-en', )] = tasksCompletedThatDay.length;
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
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsTabMonth;
