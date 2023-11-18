import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../../contexts/tasks.context';


const NewTaskButton = () => {
  const { state, dispatch } = useTaskContext();
  const [ counter, setCounter ] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const addnewtask = () => {
    const newTask = {
      id: counter,
      taskName: inputValue,
      description: 'desc',
      date: '',
      type: '',
      tags: [],
    };


    dispatch({ type: 'ADD_TASK', payload: newTask });
    setCounter(counter+1);
    console.log(state);
  };


  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Add New Task'
      />

      <button type="button" onClick={addnewtask}>
        Add New Task
      </button>
    </div>
  );
}

export default NewTaskButton;