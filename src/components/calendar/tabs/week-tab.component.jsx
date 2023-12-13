import React, { useContext } from 'react'
import { getDates, getDayName } from '../../../utils/date.utils';
import { getTaskForDate, getTasksForToday } from '../../../utils/task.utils';
import { TasksContext } from '../../../contexts/tasks.context';


const nameOfWeekToNumber = {
  'Monday': 0,
  'Tuesday': 1,
  'Wednesday': 2,
  'Thursday': 3,
  'Friday': 4,
  'Saturday': 5,
  'Sunday': 6
}

const WeekTab = ({nextWeekNumber}) => {
  const {state} = useContext(TasksContext);
  const tasksTemplate = [
    {
      taskName: 'XD',
      description: 'XDD',
      date: new Date(),
      type: 'XD',
      tags: 'DX'
    },
    {
      taskName: 'XD',
      description: 'XDD',
      date: new Date(),
      type: 'XD',
      tags: 'DX'
    },
    {
      taskName: 'XD',
      description: 'XDD',
      date: new Date(),
      type: 'XD',
      tags: 'DX'
    }
  ]

  const today = new Date();

  const endDateOfTheWeek = new Date();

  endDateOfTheWeek.setDate(endDateOfTheWeek.getDate() + 6)
  
  const datesBettween = getDates(today, endDateOfTheWeek);
  return (
    <div className='mt-5'>
    {datesBettween.map((date) => {
      const tasksForDate = getTaskForDate(state.tasks, date);
      return (
      <div>
        <div className='text-start mx-2'>
          <div className='font-semibold'>{getDayName(date)}</div>
            
            <div className='bg-gray-200 rounded-md my-2 py-2 px-1 max-h-56 overflow-y-auto'>
              {tasksForDate.map((task) => (
                <div className='bg-blue-300 rounded-lg my-2 px-2 pb-5 flex flex-col'> 
                  <p className='font-semibold'>{task.taskName}</p> <p className='pt-2'>{task.date.getHours()} : {task.date.getMinutes()}</p>
                </div>
              ))}
            </div>
        </div>
        </div>
      )
      
      })}      
    </div>

 
                    

  )
}

export default WeekTab

