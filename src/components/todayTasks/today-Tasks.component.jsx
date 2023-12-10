import React, { useContext } from 'react'
import { getTasksForToday } from '../../utils/task.utils';
import ListOfTasksCard from '../upcomingTasks/ListOfTasksCard.component';
import { TasksContext } from '../../contexts/tasks.context';

const TodayTasks = () => {
  const {state} = useContext(TasksContext);
  const todayTasks = getTasksForToday(state.tasks);

  return (
    <div className='sm: mx-4'>
      <div className='hidden sm:flex flex-row py-2 visible'>
        <span className='text-3xl pr-5 font-semibold'>Today</span>
        <h2 className='p-1 px-3 text-2xl border-2 rounded-lg bg-gray-100'>{todayTasks ? todayTasks.length : 0}</h2>
      </div>
      <ListOfTasksCard name={"Today"} tasks={todayTasks}/>
    </div>
  )
}

export default TodayTasks
