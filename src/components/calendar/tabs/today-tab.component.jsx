import React, { useContext, useEffect, useState } from 'react'
import { getDayName, getTodayDay } from '../../../utils/date.utils';
import { TasksContext } from '../../../contexts/tasks.context';
import { getTasksForToday } from '../../../utils/task.utils';
import { TaskFilter } from '../../../contexts/filter.context';
import { SearchContext } from '../../../contexts/search.context';
import CalendarTaskCard from '../calendar-task-card-component';

const TodayTab = ( { nextDayNumber }) => {
  const {state} = useContext(TasksContext);
  const {state: filterState} = useContext(TaskFilter);
  const {state: searchState} = useContext(SearchContext)
  const [todayTasks, setTodayTasks] = useState([])
  
  useEffect(() => {
    setTodayTasks(getTasksForToday(state.tasks, filterState.listFilter, searchState.search));
  }, [state.tasks, filterState, searchState])


  const options = {
    weekday: 'long',
  };

  const today = new Date()
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + nextDayNumber);


  return (
    <div>
      {
      todayTasks.length == 0 
      ? 
      <div className='m-5'>No Tasks for Today</div> 
      :
      <div className=''>
            <div class="flex flex-col mt-5 max-h-96 sm:max-w-xl mx-auto overflow-y-auto">
              <div className='flex items-start'>
                <div className='font-semibold'>{getDayName(today)}</div>
              </div>
                {todayTasks.map((task) => (
                  <CalendarTaskCard taskToRender={task} key={task.id}/>
                ))}
            </div>
        </div>
      }
       
    </div>
  )
}

export default TodayTab
