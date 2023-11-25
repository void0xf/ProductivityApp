import React, { useId, useState } from 'react'
import './tags.css'
import { useTaskContext } from '../../../contexts/tasks.context';

const Tags = () => {
  const { state, dispatch } = useTaskContext();
  const [ inputValue, setInputValue ] = useState('');

  const handleListAdd = () => {
    dispatch({type:'ADD_TAG', payload: inputValue})
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
      <h3>TAGS</h3>
      <div className="tags-container">
        { state.tags.map((tagName) => (
          <div key={crypto.randomUUID()}>{tagName}</div>
        ))}

        <input type="text" onKeyDown={handelKeyDown} onChange={handelOnChange}/>
      </div>
    </div>
  )
}

export default Tags;
