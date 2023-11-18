import React from 'react'
import './task-info-bar.css'
import { useTaskContext } from '../../contexts/tasks.context';

const TaskInfoBar = () => {
  const { state, dispatch } = useTaskContext();

  const activeTask = state.tasks.find((task) => task.id == state.activeTaskId)  
  const { taskName, description} = activeTask;

  return (
    <div className='task-info-bar'>
      <h3>Task: {taskName}</h3>
      <h5>Description: {description}</h5>
      <input type="text" placeholder=''/><br />
      <input type="text" placeholder=''/>
      <p>List: </p> <input type="select" />
      <p>Date: </p> <input type="select" />
      <p>Tags: </p> <button>Add Tag</button>
    </div>
  )
}

export default TaskInfoBar;
