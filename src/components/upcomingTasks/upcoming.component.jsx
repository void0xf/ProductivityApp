import React, { useContext, useEffect, useState } from 'react'
import ListOfTasksCard from './ListOfTasksCard.component'
import { TasksContext } from '../../contexts/tasks.context'
import { getTasksForThisWeek, getTasksForToday, getTasksForTommorow } from '../../utils/task.utils';
import { TaskFilter } from '../../contexts/filter.context';
import { SearchContext } from '../../contexts/search.context';
import ComputerTitleCard from '../category-title-card/computer-title-card';

const Upcoming = () => {
  const {state} = useContext(TasksContext);
  const {state: filterState} = useContext(TaskFilter);
  const {state: searchState} = useContext(SearchContext);
  const [todayTasks, setTodayTasks] = useState([])
  const [tommorowTasks, setTommorowTasks] = useState([])
  const [thisWeekTasks, setThisWeekTasks] = useState([])

  useEffect(() => {
    setTodayTasks(getTasksForToday(state.tasks, filterState.listFilter, searchState.search));
    setTommorowTasks(getTasksForTommorow(state.tasks, filterState.listFilter, searchState.search));
    setThisWeekTasks(getTasksForThisWeek(state.tasks, filterState.listFilter, searchState.search));

  }, [state.tasks, filterState, searchState])

  return (
    <div className='sm: mx-4 h-screen'>
      <ComputerTitleCard name={"Upcoming"} numberOfNotifictaions={thisWeekTasks.length > 0 ? thisWeekTasks.length : '-' }/>
      
      <ListOfTasksCard name={"Today"} tasks={todayTasks} addForTommorow={false}/>
      <ListOfTasksCard name={"Tommorow"} tasks={tommorowTasks} addForTommorow={true}/>
      <ListOfTasksCard name={"This Week"} tasks={thisWeekTasks} addForTommorow={false}/>
    </div>
  )
}

export default Upcoming
