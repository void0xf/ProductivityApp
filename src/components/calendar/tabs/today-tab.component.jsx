import React, { useContext } from 'react'
import { getTodayDay } from '../../../utils/date.utils';
import { TasksContext } from '../../../contexts/tasks.context';
import { getTasksForToday } from '../../../utils/task.utils';

const TodayTab = ( { nextDayNumber }) => {
  const {state} = useContext(TasksContext);
  

  const options = {
    weekday: 'long',
  };

  const today = new Date()
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + nextDayNumber);

  const tasks = getTasksForToday(state.tasks)

  return (
    <div>
      {
      tasks.length == 0 
      ? 
      <div className='m-5'>No Tasks to Display</div> 
      :
      <div className=''>
        {/* <div className='col-span-5'></div>
        <div className='font-medium'>{date.toLocaleDateString('en-EN', options)}</div>
          {tasks.map((task) => (
          <>
            <div className='p-2 border-t-2 col-span-5'>
              {
                `${task.date.getHours().toString().length == 1 ? "0" : ""} 
                ${task.date.getHours()} 
                : 
                ${task.date.getMinutes().toString().length == 1 ? `0 ${task.date.getMinutes()}` : task.date.getMinutes()}
                `
              }
              </div>
            <div className='bg-blue-300 rounded-md p-1 font-normal'>{task.taskName}</div>
          </>
          ))} */}

            <div class="flex flex-col mt-5 sm: min-w-full">
                {tasks.map((task) => (
                    <div className='flex border-2 max-h-96 rounded-lg my-2 bg-blue-200 sm:max-w-2xl mx-auto min-w-[32rem]'>
                      <div className='p-2 flex'>
                          {
                            <div>
                            <div className='text-left text-lg font-semibold'><p>{task.taskName}</p>
                            </div>
                            
                            <div className='flex mt-2'>
                              <div>{task.date.getHours().toString().length == 1 ? "0" : ""} 
                              {task.date.getHours()} 
                              </div>
                              <div>:</div>
                              <div>
                              {task.date.getMinutes().toString().length == 1 ? `0 ${task.date.getMinutes()}` : task.date.getMinutes()}
                              </div>
                            </div>
                            </div>
                          }
                        </div>
                   </div>
                ))
                }
              
            </div>
        </div>
      }
       
    </div>
  )
}

export default TodayTab
