import React, { useEffect, useState } from 'react'
import NewTaskButton from './new-task-button/new-task-button.component';
import { useTaskContext } from '../../contexts/tasks.context';
import TaskInfoBar from '../task-info-bar/task-info-bar.component';
import NewTask from './new-task/new-task.component';

const TaskBar = () => {
  const { state, dispatch } = useTaskContext();

  return (
    <div className='task-bar w-1/3'>
      <div className='heading flex flex-row py-2'>
        <span className='text-3xl pr-5'>Today</span>
        <h2 className='p-1 px-3 text-2xl border-2 rounded-lg bg-gray-100'>{state.tasks.length}</h2>
      </div>
      
      <NewTaskButton />

      {state.tasks.map((task) => (
        <ul className='my-1'>
          <NewTask taskTitle={task.taskName} taskId={task.id}/>
        </ul>
    ))}

      
    </div>
  )
}

export default TaskBar;
