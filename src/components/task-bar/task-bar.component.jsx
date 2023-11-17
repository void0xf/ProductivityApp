import React from 'react'
import NewTaskButton from './new-task-button/new-task-button.component';


const TaskBar = () => {
  return (
    <div className='task-bar'>
      <div className='heading'>
        <h1>Today </h1>
        <h2>Tasks Number</h2>
      </div>
      
      <NewTaskButton />

      <div className='current-task'>
        <input type="checkbox" />
        <p>Task Description</p>
        <button>Show More Button</button>
      </div>
    </div>
  )
}

export default TaskBar;
