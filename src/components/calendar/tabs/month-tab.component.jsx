import React from 'react'
import MonthTabCard from './month-tab-card.component'
import { getDates, getDayName, getTodayDay } from '../../../utils/date.utils'

const nameOfWeekToNumber = {
  'Monday': 0,
  'Tuesday': 1,
  'Wednesday': 2,
  'Thursday': 3,
  'Friday': 4,
  'Saturday': 5,
  'Sunday': 6
}

const doesTaskForThatDayExist = (date ,tasks) => {
  const result = Array();

  tasks.forEach((task) => {
    if(task.date.getDate() === date.getDate() && task.date.getMonth() === date.getMonth()) {
      result.push(task.taskName)
    } 
  })
  return result
}


const MonthTab = ({ nextMonthNumber }) => {
  // const tasks = [
  //   {
  //     taskName: 'XD',
  //     description: 'XDD',
  //     date: new Date(),
  //     type: 'XD',
  //     tags: 'DX'
  //   },
  //   {
  //     taskName: 'XD',
  //     description: 'XDD',
  //     date: new Date(),
  //     type: 'XD',
  //     tags: 'DX'
  //   },
  //   {
  //     taskName: 'XD',
  //     description: 'XDD',
  //     date: new Date(),
  //     type: 'XD',
  //     tags: 'DX'
  //   }
  // ]

  // const today = new Date();
  // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() + nextMonthNumber , 1);
  // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1 + nextMonthNumber, 0);
  // const datesBetweenTwoDates = getDates(firstDayOfMonth, lastDayOfMonth);
  // return (
  //   <div>
      
  //     <div className="grid grid-cols-7 mx-10">
  //       <div>Mon</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
  //       {
  //           datesBetweenTwoDates.map((date) => {
  //             const tasksForDate = doesTaskForThatDayExist(date, tasks)
              
  //             return tasksForDate ? (
  //               <MonthTabCard dayOfMonth={date.getDate()} tasks={tasksForDate} />
  //             ) : null;
            
  //           })
  //         }

  //     </div>
  //   </div>
  // )
}

export default MonthTab
