import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../../contexts/tasks.context';
import Button from '@mui/joy/Button';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';



const NewTaskButton = ({addForTommorow}) => {
  const uniqueId = uuidv4();

  const { state, dispatch } = useTaskContext();
  const [ counter, setCounter ] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      addNewTask();
    }
  }

  const addNewTask = () => {
    const dateToSet = addForTommorow ? new Date() : new Date(); // Default to today's date
    if (addForTommorow) {
      dateToSet.setDate(dateToSet.getDate() + 1); // Add 1 day if for tomorrow
    }
  
    const newTask = {
      id: uniqueId,
      taskName: inputValue,
      description: '',
      date: dateToSet,
      list: 'None',
      tags: [],
    };
  
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Handle form submission here
  };

  return (
    <div className=''>
      <div className="relative w-full">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          placeholder='Add New Task'
          className='pl-10 pr-4 py-2 border rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40'
        />
        </form>
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