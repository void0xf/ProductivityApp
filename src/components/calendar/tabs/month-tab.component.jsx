import React, { useContext, useEffect, useState } from 'react'
import MonthTabCard from './month-tab-card.component'
import { getDates, getDayName, getTodayDay } from '../../../utils/date.utils'
import { Dot } from 'lucide-react'
import { TasksContext } from '../../../contexts/tasks.context'
import { getTaskForDate } from '../../../utils/task.utils'

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
  endOfTheMonth.setDate(startOfTheMonth.getDate() + 30)
  const [dateToShow, setDateToShow] = useState();
  const [tasksForDate, setTasksForDate] = useState([])
  const dates = getDates(startOfTheMonth, endOfTheMonth)

  const handleClickOnDate = (date) => {
    const d = new Date(date);
    setDateToShow(d);
  }

  useEffect(() => {
    const tasks = getTaskForDate(state.tasks, dateToShow)
    setTasksForDate(tasks);
  }, [dateToShow])

  return (
    <div>
   <div className='grid grid-cols-7 mt-5'>
    <div className='font-semibold'>M</div><div className='font-semibold'>T</div><div className='font-semibold'>W</div><div className='font-semibold'>T</div><div className='font-semibold'>F</div><div className='font-semibold'>S</div><div className='font-semibold'>S</div>
    {dates.map((date) => (
      
      <div className='flex flex-col items-center  m-1'>
        <button onClick={() => {handleClickOnDate(date)}}>
          <div className={`
            ${getTaskForDate(state.tasks, date).length === 0 ? 'font-base': 'font-semibold'}
          `}>{date.getDate()}</div>
          <div>{getTaskForDate(state.tasks, date).length === 0 ? <p></p> : <Dot size={22} strokeWidth={3} />}</div>
        </button>
      </div>
    ))}
      </div>
      <div className=' rounded-md my-2 py-2 px-1 max-h-56 overflow-y-auto mt-5 sm: max-h-96'>
      {tasksForDate.map((task) => (
        <div className='bg-[#D8D9DA] rounded-lg my-2 px-2 pb-5 flex flex-col items-start'> 
          <p className='font-semibold sm:text-2xl'>{task.taskName}</p> <p className='pt-1'>{task.date.getHours()}:{task.date.getMinutes()}</p>
        </div>
      ))}
      </div>
  </div>



 );
}

export default MonthTab
