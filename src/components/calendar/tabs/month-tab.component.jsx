import React, { useContext, useEffect, useState } from 'react'
import MonthTabCard from './month-tab-card.component'
import { compareDate, getDates, getDayName, getTodayDay } from '../../../utils/date.utils'
import { Dot } from 'lucide-react'
import { TasksContext } from '../../../contexts/tasks.context'
import { getTaskForDate } from '../../../utils/task.utils'
import CalendarTaskCard from '../calendar-task-card-component'
import { TaskFilter } from '../../../contexts/filter.context'
import { SearchContext } from '../../../contexts/search.context'

const nameOfWeekToNumber = {
  'Monday': 0,
  'Tuesday': 1,
  'Wednesday': 2,
  'Thursday': 3,
  'Friday': 4,
  'Saturday': 5,
  'Sunday': 6
}

//bugged ToDo make aligment for dates 

const MonthTab = ({ nextMonthNumber }) => {
  const startOfTheMonth = new Date();
  const endOfTheMonth = new Date();
  const {state} = useContext(TasksContext)
  const {state: filterState} = useContext(TaskFilter);
  const {state: searchState} = useContext(SearchContext);
  endOfTheMonth.setDate(startOfTheMonth.getDate() + 30)
  const [dateToShow, setDateToShow] = useState(new Date());
  const [tasksForDate, setTasksForDate] = useState([])
  const dates = getDates(startOfTheMonth, endOfTheMonth)
  console.log(dates);
  const handleClickOnDate = (date) => {
    const d = new Date(date);
    setDateToShow(d);
  }

  useEffect(() => {
    const tasks = getTaskForDate(state.tasks, dateToShow, filterState.listFilter, searchState.search)
    setTasksForDate(tasks);
  }, [dateToShow, filterState, searchState])

  return (
    <div>
   <div className='grid grid-cols-7 mt-5 rounded-xl p-1 '>
    {
      dates.slice(0,7).map((date) => (
        <div className='font-semibold'>{date.toLocaleString('EN-en', {weekday:"long"}).slice(0,2)}</div>
      ))
    }

    {dates.map((date) => (
      <div className='flex flex-col items-center m-1'>
        <div 
        className={`${compareDate(date, dateToShow) ? 'bg-[#D8D9DA] rounded-lg p-1' : ''}`}
        >
          <button 
            onClick={() => {handleClickOnDate(date)}}>
            <div 
            className={`
              ${getTaskForDate(state.tasks, date, filterState.listFilter, searchState.search).length === 0 
                ? 'font-base'
                : 'font-semibold'}
              `}>
              {date.getDate()}
            </div>
            <div>
              {getTaskForDate(state.tasks, date, filterState.listFilter, searchState.search).length === 0 
              ? null 
              : <Dot size={22} strokeWidth={3} />}
            </div>
          </button>
        </div>
      </div>
    ))}
      </div>
      <div className='rounded-md my-2 py-2 px-1 max-h-56 overflow-y-auto mt-5 sm: max-h-96'>
      {tasksForDate.map((task) => (
        <div className='mb-4'>
          <CalendarTaskCard taskToRender={task}/>
        </div>
      ))}
      </div>
  </div>



 );
}

export default MonthTab
