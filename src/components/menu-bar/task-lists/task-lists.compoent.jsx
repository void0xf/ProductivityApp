import React from 'react'
import './task-lists.css'

const TasksList = () => {
  return (
    <div>
      <h3>TASKS</h3>
      
      <div className='tasks-list'>
        <div className='tasks-list-item'>ICON</div>
        <div className='tasks-list-item'><p>Upcoming</p></div>
        <div className='tasks-list-item'><p>task_number</p></div>
      </div> 

      <div className='tasks-list'>
        <div className='tasks-list-item'>ICON</div>
        <div className='tasks-list-item'><p>Today</p></div>
        <div className='tasks-list-item'><p>task_number</p></div>
      </div> 

      <div className='tasks-list'>
        <div className='tasks-list-item'>ICON</div>
        <div className='tasks-list-item'><p>Calendar</p></div>
      </div> 

      <div className='tasks-list'>
        <div className='tasks-list-item'>ICON</div>
        <div className='tasks-list-item'><p>Stikcy Wall</p></div>
      </div> 
    </div>
  )
}

export default TasksList;
