import React from 'react'
import './lists.css';

const Lists = () => {
  return (
    <div>
      <h3>Lists</h3>

      <div className='list'>
        <div className='list-item'>ICON</div>
        <div className='list-item'><p>Personal</p></div>
        <div className='list-item'><p>task_number</p></div>
      </div> 

      <div className='list'>
        <div className='list-item'>ICON</div>
        <div className='list-item'><p>Work</p></div>
        <div className='list-item'><p>task_number</p></div>
      </div> 

      <div className='list'>
        <div className='list-item'>ICON</div>
        <div className='list-item'><p>Upcoming</p></div>
        <div className='list-item'><p>task_number</p></div>
      </div> 

      <button>Add New List</button>
    </div>
  )
}

export default Lists;
