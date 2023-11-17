import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../../contexts/tasks.context';


const NewTaskButton = () => {
  const { state, dispatch } = useTaskContext();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const addnewtask = () => {
    const newTask = {
      id: 1,
      taskName: inputValue,
      description: '',
      date: '',
      type: '',
      tags: [],
    };


    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  useEffect(() => {
    console.log(state.isTaskTabOpen)
  }, [state])

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