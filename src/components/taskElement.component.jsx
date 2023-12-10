import { ChevronRight } from 'lucide-react'
import React, { useContext } from 'react'
import { TasksContext } from '../contexts/tasks.context';



const TaskElement = ({id, taskName}) => {
  const {dispatch} = useContext(TasksContext)

  const handleOpenTaskTab = (taskId) => {
    dispatch({ type: 'OPEN_TASK_TAB', payload: taskId });
  };

  return (
    <div className='flex justify-between border-b-2 py-2 rounded-md'>
        <div className='flex items-center'>
          <div className='px-2'><input type="checkbox" /></div>
          <div><p>{taskName}</p></div>
        </div>
      <button className='p-2' onClick={() => {handleOpenTaskTab(id)}}> <ChevronRight /> </button>
    </div>
  )
}

export default TaskElement
