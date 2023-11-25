import React, { useEffect, useState } from 'react'
import NewTaskButton from './new-task-button/new-task-button.component';
import { useTaskContext } from '../../contexts/tasks.context';
import TaskInfoBar from '../task-info-bar/task-info-bar.component';
import NewTask from './new-task/new-task.component';

const TaskBar = () => {
  const { state, dispatch } = useTaskContext();

  return (
    <div className='task-bar'>
      <div className='heading flex flex-row'>
        <span className='text-xl'>Today</span>
        <h2 className='p-2 text-xl'>{state.tasks.length}</h2>
      </div>
      
      <NewTaskButton />

      {state.tasks.map((task) => (
        <ul>
          <NewTask taskTitle={task.taskName} taskId={task.id}/>
        </ul>
    ))}

      
    </div>
  )
}

export default TaskBar;
