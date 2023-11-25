import React, { useState } from 'react'
import './lists.css';
import { useTaskContext } from '../../../contexts/tasks.context';


const Lists = () => {
  const { state, dispatch } = useTaskContext();
  const [ inputValue, setInputValue ] = useState('');

  const handleListAdd = () => {
    dispatch({type:'ADD_LIST', payload: inputValue})
  }

  const handelOnChange = (e) => {
    setInputValue(e.target.value);
  }

  const handelKeyDown = (e) => {
    if(e.key == 'Enter') {
      handleListAdd();
    }
  }

  
  return (
    <div>
      <h3>Lists</h3>

      {state.lists.map((listname) => (
        <div className='list'>
        <div className='list-item'>ICON</div>
        <div className='list-item'><p>{listname}</p></div>
        <div className='list-item'><p></p></div>
      </div> 
      ))}



      {/* <div className='list'>
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
      </div>  */}

      <input type="text" onKeyDown={handelKeyDown} onChange={handelOnChange}/>
    </div>
  )
}

export default Lists;
