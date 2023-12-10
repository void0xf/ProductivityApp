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
    <div>
    {datesBettween.map((date) => {
      const tasksForDate = getTaskForDate(state.tasks, date);
      return (
      <div>
        <div>{getDayName(date)}</div>
          <div>
            {tasksForDate.map((task) => (
              <p>{task.taskName}</p>
            ))}
          </div>
      </div>
      )
      
      })}      
    </div>

 
                    

  )
}

export default WeekTab

