import React, { useContext, useEffect, useState } from 'react'
import ListOfTasksCard from './ListOfTasksCard.component'
import { TasksContext } from '../../contexts/tasks.context'
import { getTasksForThisWeek, getTasksForToday, getTasksForTommorow } from '../../utils/task.utils';

const Upcoming = () => {
  const {state} = useContext(TasksContext);
  const [todayTasks, setTodayTasks] = useState([])
  const [tommorowTasks, setTommorowTasks] = useState([])
  const [thisWeekTasks, setThisWeekTasks] = useState([])

  useEffect(() => {
    setTodayTasks(getTasksForToday(state.tasks));
    setTommorowTasks(getTasksForTommorow(state.tasks));
    setThisWeekTasks(getTasksForThisWeek(state.tasks));

  }, [state.tasks])

  return (
    <div className='sm: mx-4'>
      <div className='hidden sm:flex flex-row py-2 visible'>
        <span className='text-3xl pr-5 font-semibold'>Upcoming</span>
        <span className='p-1 px-3 text-2xl border-2 rounded-lg bg-gray-100'>{state.tasks.length}</span>
      </div>
      
      <ListOfTasksCard name={"Today"} tasks={todayTasks} addForTommorow={false}/>
      <ListOfTasksCard name={"Tommorow"} tasks={tommorowTasks} addForTommorow={true}/>
      <ListOfTasksCard name={"This Week"} tasks={thisWeekTasks} addForTommorow={false}/>
    </div>
  )
}

export default Upcoming
