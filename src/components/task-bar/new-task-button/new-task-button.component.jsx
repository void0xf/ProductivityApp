import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../../contexts/tasks.context';
import Button from '@mui/joy/Button';
import { Plus } from 'lucide-react';


const NewTaskButton = () => {
  const { state, dispatch } = useTaskContext();
  const [ counter, setCounter ] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (key) => {
    if(key === 'Enter') {
      addNewTask();
    }
  }

  const addNewTask = () => {
    const newTask = {
      id: counter,
      taskName: inputValue,
      description: '',
      date: '',
      type: '',
      tags: [],
    };


    dispatch({ type: 'ADD_TASK', payload: newTask });
    setCounter(counter+1);
  };


  return (
    <div className=''>
      <div className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyPress(e.key)}
          placeholder='Add New Task'
          className='pl-10 pr-4 py-2 border rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40'
        />
       <div class="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"> 
             <Plus color='grey'/>
        </div> 
      </div>
      

    </div>
  );
}

export default NewTaskButton;