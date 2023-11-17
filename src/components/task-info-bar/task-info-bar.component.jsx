import React from 'react'
import './task-info-bar.css'

const TaskInfoBar = () => {
  return (
    <div className='task-info-bar'>
      <h3>Task: </h3>
      <input type="text" placeholder=''/><br />
      <input type="text" placeholder=''/>
      <p>List: </p> <input type="select" />
      <p>Date: </p> <input type="select" />
      <p>Tags: </p> <button>Add Tag</button>
    </div>
  )
}

export default TaskInfoBar;
