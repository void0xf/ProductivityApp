import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useTaskContext } from '../../../contexts/tasks.context';

const NewTask = ({taskTitle, taskId}) => {
  const { state, dispatch } = useTaskContext();

  const handleOpenTaskTab = (taskId) => {
    console.log(taskId);
    dispatch({ type: 'OPEN_TASK_TAB', payload: taskId });
  };

  return (
      <li>
        <div className='container flex flex-row border-b-2 justify-between min-w-40'>
          <div className=' flex flex-row'>
            <div className='p-2'>
              <input type="checkbox"  />
            </div>
            <div className='p-2'>
              <span className='text-gray-700 font-semibold'>{taskTitle}</span>
            </div>
          </div>
          
          <div className='p-2'>
            <button onClick={() => {handleOpenTaskTab(taskId)}}><ChevronRight color='grey' /></button>
          </div>
        </div>
        

      </li>
  )
}

export default NewTask
