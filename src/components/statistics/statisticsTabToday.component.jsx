import React, { useContext } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TasksContext } from '../../contexts/tasks.context';
import { getTasksForThatTime, getTasksForToday } from '../../utils/task.utils';

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const time = payload[0].payload['Time'];
      const tasksDone = payload[0].payload['TasksDone']
      const color = payload[0].stroke;
      return (
        <div className="bg-gray-800 text-white p-4 rounded shadow-md">
          <p className="mb-2"><strong>Time:</strong> {time}</p>
          <p className={`text-[${color}]`}><strong>Tasks Done:</strong> {tasksDone}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='flex flex-col'>
      <div className='relative right-6'>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="TasksDone" stroke="#8884d8" />
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
