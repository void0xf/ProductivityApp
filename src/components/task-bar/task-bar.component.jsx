import React, { useEffect, useState } from 'react'
import NewTaskButton from './new-task-button/new-task-button.component';
import { useTaskContext } from '../../contexts/tasks.context';
import TaskInfoBar from '../task-info-bar/task-info-bar.component';

const TaskBar = () => {
  const { state, dispatch } = useTaskContext();

  const handleOpenTaskTab = (taskId) => {
    dispatch({ type: 'OPEN_TASK_TAB', payload: taskId });
  };


  return (
    <div className='task-bar'>
      <div className='heading'>
        <h1>Today </h1>
        <h2>Tasks Number</h2>
      </div>
      
      <NewTaskButton />

      {state.tasks.map((task) => (
      <div className='current-task' key={task.id}>
      <input type="checkbox" />
      <p>{task.taskName}</p>
      <button onClick={() => {handleOpenTaskTab(task.id)}}>Show More Button</button>
      </div>
    ))}

      
    </div>
  )
}

export default TaskBar;
